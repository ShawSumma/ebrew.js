
import { Form, Ident, Value } from '/src/parser.js';

const mangle = (name) => {
    return 'eb_' + name.replace(/-/g, '_DASH_');
};

export const Compiler = class {
    constructor() {
        this.globals = {};
    }

    compile(node) {
        if (node instanceof Form) {
            const nodeArgs = node.args;
            switch (node.form) {
                case 'generic': {
                    return this.compile(nodeArgs[nodeArgs.length - 1]);
                }
                case 'program': {
                    let ret = [];
                    for (const def of nodeArgs) {
                        ret.push(this.compile(def));
                        ret.push(';');
                    }
                    return `(async()=>{${ret.join('')}})().catch((e) => {throw e;})`;
                }
                case 'func': {
                    const name = nodeArgs[0].repr;
                    const args = nodeArgs.slice(1, -1).map(arg => mangle(arg.repr));
                    const then = this.compile(nodeArgs[nodeArgs.length - 1]);
                    return `const ${mangle(name)}=async(${args.join(',')})=>${then}`;
                }
                case 'extern': {
                    const name = nodeArgs[0].repr;
                    return `const ${mangle(name)}=rt_load("${name}")`;
                }
                case 'call': {
                    const args = nodeArgs.map(arg => this.compile(arg));
                    return `(await ${args[0]}(${args.slice(1).join(',')}))`;
                }
                case 'lambda': {
                    const args = nodeArgs.map(arg => this.compile(arg));
                    return `(async(${args.slice(0, -1).join(',')})=>${args[args.length - 1]})`
                }
                default: {
                    throw new Error(`error: ${node}`);
                }
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
        } else {
            throw new Error(`error: ${node}`);
        }
    }
};
