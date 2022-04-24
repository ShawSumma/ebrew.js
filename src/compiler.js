
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
                    return `(async()=>{${ret.join('')}return await main(eb_main);})().catch((e) => {throw e;})`;
                }
                case 'func': {
                    const name = node.args[0].repr;
                    const args = node.args.slice(1, -1)
                        .filter(arg => arg.args[0].repr[0] !== '$')
                        .map(arg => mangle(arg.args[0].repr));
                    const then = this.compile(node.args[node.args.length - 1]);
                    return `const ${mangle(name)}=async(${args.join(',')})=>${then};`;
                }
                case 'extern': {
                    const name = node.args[0].repr;
                    return `const ${mangle(name)}=await rt_load("${name}");`;
                }
                case 'call': {
                    const args = node.args.map(arg => this.compile(arg));
                    return `(await ${args[0]}(${args.slice(1).join(',')}))`;
                }
                case 'lambda': {
                    const args = node.args[0].args.map(arg => mangle(arg.repr));
                    return `(async(${args.join(',')})=>${this.compile(node.args[1])})`
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
                return `${node.repr}`;
            }
        }
        console.log(node);
    }
};

module.exports = {
    Compiler,
};
