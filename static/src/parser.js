
export const Form = class {
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
        return `(${this.form}: ${this.args.map(x => x.toString()).join(' ')})`;
    }
};

export const Ident = class {
    constructor(src) {
        this.repr = src;
    }

    toString() {
        return this.repr;
    }
}

export const Value = class {
    constructor(value) {
        this.repr = value;
    }

    toString() {
        return `[${this.repr}]`;
    }
};

export const State = class {
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

export const Binding = class {
    constructor(name, generics=null, args = null, allowed = []) {
        this.name = name;
        this.args = args;
        this.generics = generics;
        this.func = generics != null;
        this.allowed = allowed;
    }

    toString() {
        if (this.func) {
            return `(${String(this.name)} [${this.generics.join(' ')}] ${this.args.map(x => x.toString()).join(' ')})`;
        } else {
            return String(this.name);
        }
    }
};

export const ParseError = class extends Error {
    constructor(line, col, msg) {
        super(`at Line ${line} Column ${col}: ${msg}`);
        this.text = msg;
        this.line = line;
        this.col = col;
    }
}

export const Parser = class {
    constructor(binding, readFile) {
        this.realDefs = [{}];
        this.state = new State(binding);
        this.generics = [];
        this.errors = [];
        this.readFile = readFile;
    }

    get defs() {
        // for (const scope of this.realDefs) {
        //     for (const key of Object.keys(scope)) {
        //         if (key !== scope[key].name.repr) {
        //             throw new Error(key);
        //             console.log(key + " = " + scope[key].toString());
        //         }
        //     }
        // }
        return this.realDefs;
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

    raiseFrom(pos, err) {
        throw new ParseError(pos.line, pos.col, err);
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

    readArgArray(allowed) {
        allowed = [...allowed];
        this.skipSpace();
        if (this.state.first() !== '(') {
            this.raise("toplevel: expected an open paren");
            return new Binding(null);
        }
        this.state.skip();
        const generic = [];
        const args = [];
        while (true) {
            this.skipSpace();
            if (this.state.done()) {
                this.raise("toplevel: file ended when reading function definition arguments");
                return new Binding(null);
            } else if (this.state.first() === ')') {
                this.state.skip();
                break;
            } else if (this.state.first() === '(') {
                this.skipSpace();
                const type = this.readArgArray(allowed);
                this.skipSpace();
                if (!type.func) {
                    this.raise('arglist: empty parens found in definition arguments');
                }
                args.push(type);
            } else if (this.state.first() === '[') {
                this.state.skip();
                while (true) {
                    this.skipSpace();
                    if (this.state.done()) {
                        this.raise('toplevel: expected closing square bracket for generics');
                        return new Binding(null);
                    }
                    if (this.state.first() === ']') {
                        this.state.skip();
                        break;
                    }
                    const name = this.readName()
                    generic.push(name);
                    allowed.push(name.repr);
                }
            } else {
                const name = this.readName();
                args.push(new Binding(name));
            }
        }
        // console.log(args[0].name.repr, generic.map(x => x.toString()));
        return new Binding(args[0].name, generic, args.slice(1), allowed);
    }

    readGeneric() {
        this.skipSpace();
        if (this.state.first() !== '(') {
            return new Binding(this.readName());
        } else {
            const type = this.readArgArray([]);
            if (!type.func) {
                this.raise('generic arglist: empty parens found');
            }
            return type;
        }
    }

    readCall(name) {
        for (let index = this.defs.length - 1; index >= 0; index--) {
            const scope = this.defs[index];
            if (scope[name.repr] != null) {
                const binding = scope[name.repr];
                if (binding.func) {
                    const argValues = [name];
                    const curDefs = {};
                    const curGenerics = {};
                    this.defs.push(curDefs);
                    this.generics.unshift(curGenerics);
                    try {
                        for (const generic of binding.generics) {
                            const arg1 = this.readGeneric();
                            curGenerics[generic.repr] = arg1;
                        }
                        const args = binding.args.map((arg) => {
                            if (binding.allowed.includes(arg.name.repr)) {
                                for (const gen of this.generics) {
                                    const generic = gen[arg.name.repr];
                                    if (generic != null) {
                                        curDefs[generic.name.repr] = generic;
                                        return this.readExprMatch(generic);
                                    }
                                }
                            }
                            curDefs[arg.name.repr] = arg;
                            return this.readExprMatch(arg);
                        });
                        return new Form('call', binding.name, args);
                    } finally {
                        this.defs.pop();
                        this.generics.shift();
                    }
                } else {
                    return name;
                }
            }
        }
        // return this.raise(`variable not defined: ${name}`);
        return null;
    }

    readSingle(preStart) {
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
            return new Value(Number(chr.charCodeAt(0)));
        }
        const start = {
            line: this.state.line,
            col: this.state.col,
        };
        const name = this.readName();
        if (name.repr.length === 0) {
            return this.raiseFrom(preStart, 'expected expression');
        }
        let res = null;
        if (/^[0-9\\.]+$/.test(name.repr)) {
            res = new Value(Number(name.repr));
        } else {
            res = this.readCall(name);
        }
        if (res == null) {
            this.errors.push({
                msg: `not defined: ${name.repr}`,
                start: start,
                stop: {
                    line: this.state.line,
                    col: this.state.col,
                },
            });
            res = name;
        }
        this.skipSpace();
        return res;
    }

    readFunc(type) {
        const argObj = {};
        const names = type.args.map((arg) => {
            if (type.allowed.includes(arg.name.repr)) {
                for (const gen of this.generics) {
                    const generic = gen[arg.name.repr];
                    if (generic != null) {
                        argObj[arg.name.repr] = generic;
                        return generic.name;
                    }
                }
                throw new Errro(`internal pasrer error: ${arg.name.repr}`);
            } else {
                argObj[arg.name.repr] = arg;
                return arg.name;
            }
        });
        this.defs.push(argObj);
        try {
            const expr = this.readExprMatch(new Binding(null));
            return new Form('lambda', ...names, expr);
        } finally {
            this.defs.pop();
        }
    }

    readExprMatch(type, preStart = null) {
        if (preStart == null) {
            preStart = {
                line: this.state.line,
                col: this.state.col,
            };
        }
        this.skipSpace();
        if (this.state.done()) {
            return this.raise('expected expression at end of file');
        }
        if (type.func) {
            return this.readFunc(type);
        } else {
            return this.readSingle(preStart);
        }
    }

    async readPragma() {
        this.state.skip();
        const name = this.readName();
        switch (name.repr) {
        case 'use': {
            const expr = this.readExprMatch(new Binding(null));
            const name = expr.repr;
            const text = await this.readFile(name);
            const parser = new Parser(text, this.readFile);
            this.defs.unshift(...parser.defs);
            return parser.readDefs();
        }
        default: {
            return [this.raise('unknown %' + name.repr)];
        }
        }
        return [];
    }

    async readDef() {
        if (this.state.first() === '%') {
            return await this.readPragma();
        }
        if (this.state.first() !== '(') {
            return [this.readExprMatch(new Binding(null))];
        }
        const type = this.readArgArray([]);
        if (!type.func) {
            return [this.raise('toplevel: empty definiton')];
        }
        const fname = type.name;
        this.defs[0][fname.repr] = type;
        this.defs.push({});
        try {
            for (const arg of type.args) {
                this.defs[this.defs.length - 1][arg.name.repr] = arg;
            }
            const argNames = type.args.map(x => x.name);
            const preStart = {
                line: this.state.line,
                col: this.state.col,
            };
            this.skipSpace();
            if (this.state.first() === '?') {
                this.state.skip();
                return [new Form('extern', fname, argNames)];
            } else {
                const fbody = this.readExprMatch(new Binding(null), preStart);
                return [new Form('func', fname, ...argNames, fbody)];
            }
        } finally {
            this.defs.pop();
        }
    }

    async readDefs() {
        const all = [];
        while (true) {
            this.skipSpace();
            if (this.state.done()) {
                break;
            }
            const start = {
                line: this.state.line,
                col: this.state.col,
            };
            try {
                const defs = await this.readDef();
                for (const def of defs) {
                    if (def instanceof Ident && def.repr === '?') {
                        continue;
                    }
                    all.push(def);
                }
            } catch (e) {
                if (!(e instanceof ParseError)) {
                    throw e;
                }
                const stop = {
                    line: this.state.line,
                    col: this.state.col,
                };
                while (!this.state.done() && this.state.first() !== '(') {
                    this.state.skip();
                }
                const mid = {
                    line: e.line,
                    col: e.col,
                };
                this.errors.push({
                    msg: e.text,
                    start: mid,
                    stop: stop,
                });
            }
        }
        return all;
    }

    async readAll() {
        return new Form('program', ...await this.readDefs());
    }
};
