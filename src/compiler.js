
const { Form, Ident, Value } = require('./parser.js');

const mangle = (name) => {
    return 'eb_' + name.replace(/-/g, '_DASH_');
};

const Compiler = class {
    constructor() {
        this.globals = {};
    }

    compile(node) {
        if (node instanceof Form) {
            switch (node.form) {
                case 'program': {
                    let ret = [];
                    for (const def of node.args) {
                        ret.push(this.compile(def));
                    }
                    return `(async()=>{${ret.join('')}return await eb__start();})().catch(() => {})`;
                }
                case 'func': {
                    const name = node.args[0].repr;
                    const args = node.args.slice(1, -1).map(arg => mangle(arg.args[0].repr));
                    const then = this.compile(node.args[node.args.length - 1]);
                    return `const ${mangle(name)}=async(${args.join(',')})=>${then};`;
                }
                case 'extern': {
                    const name = node.args[0].repr;
                    return `const ${mangle(name)}=await rt_load("${name}");`;
                }
                case 'or': {
                    const lhs = this.compile(node.args[0]);
                    const rhs = this.compile(node.args[1]);
                    return `(${lhs}||${rhs})`;
                }
                case 'and': {
                    const lhs = this.compile(node.args[0]);
                    const rhs = this.compile(node.args[1]);
                    return `(${lhs}&&${rhs})`;
                }
                case 'do': {
                    const lhs = this.compile(node.args[0]);
                    const rhs = this.compile(node.args[1]);
                    return `(${lhs},${rhs})`;
                }
                case 'if': {
                    const cond = this.compile(node.args[0]);
                    const ift = this.compile(node.args[1]);
                    const iff = this.compile(node.args[2]);
                    return `(${cond}!==0n?${ift}:${iff})`;
                }
                case 'for': {
                    const name = node.args[0].repr;
                    const start = this.compile(node.args[1]);
                    const body = this.compile(node.args[2]);
                    return `(await(async ${mangle(name)}=>{while(true){const t=${body};if(t===0n){return ${mangle(name)};}${mangle(name)}=t;}})(${start}))`;
                }
                case 'let': {
                    const name = node.args[0].repr;
                    const value = this.compile(node.args[1]);
                    const then = this.compile(node.args[2]);
                    return `(await((async ${mangle(name)}=>${then})(${value})))`;
                }
                case 'call': {
                    const args = node.args.map(arg => this.compile(arg));
                    return `(await ${args[0]}(${args.slice(1).join(',')}))`;
                }
                default:
                    console.log(node.form);
                    return null;
            }
        } else if (node instanceof Ident) {
            return `${mangle(node.repr)}`;
        } else if (node instanceof Value) {
            if (typeof node.repr === 'string') {
                const chars = Array.from(node.repr).map(x => String(x.charCodeAt(0))).join(',');
                return `rt_str([${chars}])`;
            } else {
                return `rt_u64(${node.repr}n)`;
            }
        }
        console.log(node);
    }
};

module.exports = {
    Compiler,
};
