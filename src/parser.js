
const Form = class {
    constructor(form, ...args) {
        this.form = form;
        this.args = [];
        for (const key of args) {
            if (Array.isArray(key)) {
                this.args.push(...key);
            } else {
                this.args.push(key);
            }
        }
        if (this.args.length !== 0) {
            for (let i = 0; i < this.args.length; i++) {
                if (this.args[i].start != null) {
                    this.start = this.args[i].start;
                    break;
                }
            }
            for (let i = this.args.length - 1; i >= 0; i--) {
                if (this.args[i].end != null) {
                    this.end = this.args[i].end;
                    break;
                }
            }
        }
    }

    toString() {
        return `(${this.form}: ${this.args.map(x => String(x)).join(' ')})`;
    }
};

const Ident = class {
    constructor(src) {
        this.repr = src;
    }

    toString() {
        return this.repr;
    }
}

const Value = class {
    constructor(value) {
        this.repr = value;
    }

    toString() {
        return `[${this.repr}]`;
    }
};

const State = class {
    constructor(src) {
        this.src = src;
        this.line = 1;
        this.col = 1;
    }

    skip() {
        if (this.src[0] === '\n') {
            this.line += 1;
            this.col = 1;
        } else {
            this.col += 1;
        }
        this.src = this.src.substring(1);
    }

    done() {
        return this.src.length === 0;
    }

    first() {
        return this.src[0];
    }

    read() {
        const ret = this.first();
        this.skip();
        return ret;
    }
};

const Binding = class {
    constructor(name, generics=null, args = null, known = []) {
        this.name = name;
        this.args = args;
        this.generics = generics;
        this.known = known;
        this.func = generics != null;
    }

    toString() {
        if (this.func) {
            return `(${this.name} [${this.generics.join(' ')}] ${this.args.map(String).join(' ')})`;
        } else {
            return this.name;
        }
    }

    toType() {
        if (this.func && this.args != null) {
            const args = [];
            for (const arg of this.args) {
                args.push(arg.toType());
            }
            return new Form("type.func", this.name, args);
        } else {
            return new Form("type.value", this.name);
        }
    }
};

const ParseError = class extends Error {
    constructor(line, col, msg) {
        super(`at Line ${line} Column ${col}: ${msg}`);
        this.line = line;
        this.col = col;
    }
}

const Parser = class {
    constructor(binding) {
        this.defs = [{}];
        this.state = new State(binding);
        this.generics = {};
    }

    pos() {
        return {
            line: this.state.line,
            col: this.state.col,
        };
    }

    raise(err) {
        throw new ParseError(this.state.line, this.state.col, err);
    }

    skipSpace() {
        while (true) {
            if (this.state.done()) {
                break;
            }
            if (/\s/.test(this.state.first())) {
                this.state.skip();
                continue;
            }
            if (this.state.first() === '#') {
                this.state.skip();
                if (this.state.done()) {
                    return this.raise('unclosed comment: hashtag at end of program');
                }
                while (this.state.first() !== '#') {
                    this.state.skip();
                    if (this.state.done()) {
                        return this.raise('unclosed comment');
                    }
                }
                this.state.skip();
                continue;
            }
            break;
        }
    }

    readName() {
        this.skipSpace();
        const start = this.pos();
        const build = [];
        while (!this.state.done()) {
            const first = this.state.first();
            if (!/[0-9A-Za-z]/.test(first) && first !== '-' && first !== '_' ) {
                break;
            }
            build.push(first);
            this.state.skip();
        }
        const str = build.join('');
        const end = this.pos();
        const ret = new Ident(str);
        ret.start = start;
        ret.end = end;
        return ret;
    }

    readArgArray(known = []) {
        this.skipSpace();
        if (this.state.first() !== '(') {
            this.raise("toplevel: expected an open paren");
            return [];
        }
        this.state.skip();
        const generic = [];
        const args = [];
        while (true) {
            this.skipSpace();
            if (this.state.done()) {
                this.raise("toplevel: file ended when reading function definition arguments");
                return [];
            } else if (this.state.first() === ')') {
                this.state.skip();
                break;
            } else if (this.state.first() === '(') {
                const [genricargs, subargs] = this.readArgArray([...known]);
                if (subargs.length === 0) {
                    this.raise('arglist: empty parens found in definition arguments');
                }
                args.push(new Binding(subargs[0].name, genricargs, subargs.slice(1), known));
            } else if (this.state.first() === '[') {
                this.state.skip();
                while (true) {
                    this.skipSpace();
                    if (this.state.done()) {
                        this.raise('toplevel: expected closing square bracket for generics');
                        return [[],[]];
                    }
                    if (this.state.first() === ']') {
                        this.state.skip();
                        break;
                    }
                    const name = this.readName();
                    generic.push(new Ident(name.repr));
                    known.push(name.repr);
                }
            } else {
                const name = this.readName();
                args.push(new Binding(name));
            }
        }
        this.skipSpace();
        return [generic, args];
    }

    readGeneric() {
        this.skipSpace();
        if (this.state.first() !== '(') {
            return new Binding(this.readName());
        } else {
            const [generic, subargs] = this.readArgArray();
            if (subargs.length === 0) {
                this.raise('generic arglist: empty parens found');
            }
            return new Binding(subargs[0].name, generic, subargs.slice(1));
        }
    }

    readCall(name) {
        for (let index = this.defs.length - 1; index >= 0; index--) {
            const scope = this.defs[index];
            if (scope[name.repr] != null) {
                const binding = scope[name.repr];
                if (binding.func) {
                    const argValues = [name];
                    const original = {...this.generics};
                    const impls = [];
                    const defObj = {};
                    for (const generic of binding.generics) {
                        const bind = this.readGeneric();
                        this.generics[generic.repr] = bind;
                        defObj[bind.name.repr] = bind;
                        impls.push(generic.repr);
                    }
                    this.defs.push(defObj);
                    try {
                        for (const argType of binding.args) {
                            if (binding.known.indexOf(argType.name.repr) !== -1 || impls.indexOf(argType.name.repr) !== -1) {
                                const generic = this.generics[argType.name.repr];
                                if (generic == null) {
                                    throw new Error('unknown generic');
                                }
                                defObj[argType.name.repr] = generic;
                                argValues.push(this.readExprMatch(generic));
                            } else {
                                argValues.push(this.readExprMatch(argType));
                            }
                        }
                        return new Form('call', argValues);
                    } finally {
                        this.generics = original;
                        this.defs.pop();
                    }
                } else {
                    return name;
                }
            }
        }
        return this.raise(`variable not defined: ${name}`);
    }

    readSingle() {
        if (this.state.done()) {
            return this.raise('expected expression at end of file');
        }
        if (this.state.first() === '\"') {
            this.state.skip();
            const value = [];
            if (this.state.done()) {
                return this.raise("expected string literal at end of file");
            }
            while (this.state.first() !== '\"') {
                const chr = this.state.read();
                if (chr === '\n') {
                    return this.raise("unexpected newline in string");
                } else if (chr === '\\') {
                    const esc = this.state.read();
                    switch (esc) {
                        case '\'':
                        case '\"':
                        case '\\':
                            value.push(esc);
                            break;
                        case 'n':
                            value.push('\n');
                            break;
                        case 't':
                            value.push('\t');
                            break;
                        case 'r':
                            value.push('\r');
                            break;
                        default:
                            this.raise(`unknown escape sequence: \\${esc}`);
                    }
                } else {
                    value.push(chr);
                }
                if (this.state.done()) {
                    this.raise("unterminated string literal");
                }
            }
            this.state.skip();
            return new Value(value.join(''));
        }
        if (this.state.first() === '\'') {
            this.state.skip();
            let chr = this.state.read();
            if (chr === '\\') {
                const esc = this.state.read();
                switch (esc) {
                    case '\'':
                    case '\"':
                    case '\\':
                        chr = esc;
                        break;
                    case 'n':
                        chr = '\n';
                        break;
                    case 't':
                        chr = '\t';
                        break;
                    case 'r':
                        chr = '\r';
                        break;
                    default:
                        return this.raise(`unknown character escape sequence: '\\${chr}`);
                }
            }
            if (!this.state.done() && this.state.first() !== '\'') {
                this.state.skip();
            }
            return new Value(BigInt(chr.charCodeAt(0)));
        }
        const name = this.readName();
        if (name.repr.length === 0) {
            return this.raise('expected expression');
        }
        let res = null;
        if (/^[0-9]+$/.test(name.repr)) {
            res = new Value(BigInt(name.repr));
        } else {
            res = this.readCall(name);
        }
        this.skipSpace();
        return res;
    }

    readFunc(type) {
        const names = []
        const argObj = {};
        const known = [];
        const original = {...this.generics};
        this.defs.push(argObj);
        try {
            for (const generic of type.generics) {
                const bind = new Binding(generic);
                this.generics[generic.repr] = bind;
                argObj[generic.repr] = bind;
                known.push(generic.repr);
            }
            for (const arg of type.args) {
                if (type.known.indexOf(arg.name.repr) !== -1 || known.indexOf(arg.name.repr) !== -1) {
                    const generic = this.generics[arg.name.repr];
                    argObj[arg.name.repr] = generic;
                    names.push(generic.name);
                } else {
                    argObj[arg.name.repr] = arg;
                    names.push(arg.name);
                }
            }
            const expr = this.readExprMatch(new Binding(null));
            return new Form('lambda', new Form('args', names), expr);
        } finally {
            this.defs.pop();
            this.generics = original;
        }
    }

    readExprMatch(type) {
        this.skipSpace();
        if (this.state.done()) {
            return this.raise('expected expression at end of file');
        }
        if (type.func) {
            return this.readFunc(type);
        } else {
            return this.readSingle();
        }
    }

    readDef() {
        const [generics, vals] = this.readArgArray();
        if (vals.length === 0) {
            return this.raise('toplevel: empty definiton');
        }
        this.generics = {};
        for (const generic of generics) {
            this.generics[generic.repr] = generic;
        }
        const fname = vals.shift().name;
        this.defs[0][fname.repr] = new Binding(fname, generics, vals);
        this.defs.push({});
        try {
            for (const val of vals) {
                this.defs[this.defs.length - 1][val.name.repr] = val;
            }
            const argNames = vals.map(x => x.toType());
            this.skipSpace();
            if (this.state.first() === '?') {
                this.state.skip();
                return new Form('extern', fname, argNames);
            } else {
                const fbody = this.readExprMatch(new Binding(null));
                return new Form('func', fname, argNames, fbody);
            }
        } finally {
            this.defs.pop();
        }
    }

    readDefs() {
        const all = [];
        while (true) {
            this.skipSpace();
            if (this.state.done()) {
                break;
            }
            const def = this.readDef();
            if (def instanceof Ident && def.repr === '?') {
                continue;
            }
            all.push(def);
        }
        return new Form('program', all);
    }

    readAll() {
        const rval = this.readDefs();
        return rval;
    }
};

module.exports = {
    Parser,
    Form,
    Ident,
    Value,
    ParseError,
};
