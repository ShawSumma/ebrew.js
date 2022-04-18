
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
        return `(${this.form}: ${this.args.map(String).join(' ')})`;
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
    constructor(name, generics=null, args = null) {
        this.name = name;
        this.args = args;
        this.generics = generics;
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
        this.generics = [];
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
            if (!/[0-9A-Za-z]/.test(first) && first != '-' && first != '_') {
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

    readArgArray() {
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
                const [generic, subargs] = this.readArgArray();
                if (subargs.length === 0) {
                    this.raise('arglist: empty parens found in definition arguments');
                }
                args.push(new Binding(subargs[0].name, generic, subargs.slice(1)));
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
                    generic.push(this.readName());
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
                    const collect = {};
                    const argValues = [name];
                    for (const generic of binding.generics) {
                        collect[generic.repr] = this.readGeneric();
                    }
                    const original = this.generics;
                    this.generics = {...original, ...collect};
                    const defObj = {};
                    this.defs.push(defObj);
                    try {
                        for (const argType of binding.args) {
                            const generic = this.generics[argType.name.repr];
                            if (generic != null) {
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

    readFunc(args) {
        const names = []
        const argObj = {};
        for (const arg of args) {
            const generic = this.generics[arg.name.repr];
            if (generic != null) {
                argObj[generic.name.repr] = generic;
                names.push(generic.name);
            } else {
                argObj[arg.name.repr] = arg;
                names.push(arg.name);
            }
        }
        this.defs.push(argObj);
        try {
            const expr = this.readExprMatch(new Binding(null));
            return new Form('lambda', ...names, expr);
        } finally {
            this.defs.pop();
        }
    }

    readExprMatch(type) {
        this.skipSpace();
        if (this.state.done()) {
            return this.raise('expected expression at end of file');
        }
        if (type.func) {
            return this.readFunc(type.args);
        } else {
            return this.readSingle();
        }
    }

    readDef() {
        const [generic, vals] = this.readArgArray();
        if (vals.length === 0) {
            return this.raise('toplevel: empty definiton');
        }
        const fname = vals.shift().name;
        this.defs[0][fname.repr] = new Binding(fname, generic, vals);
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
        const arg = this.readDefs();
        console.log(String(arg));
        return arg;
    }
};

module.exports = {
    Parser,
    Form,
    Ident,
    Value,
    ParseError,
};
