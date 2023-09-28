
const rt_str = (s) => {
    return String.fromCharCode(...s);
};

const Exit = class extends Error {
    constructor(code) {
        super(`exit ${code}`);
        this.code = code;
    }
};

const main = async (f) => {
    try {
        await f();
    } catch (e) {
        if (e instanceof Exit) {
            return e.code;
        } else {
            throw e;
        }
    }
    return 0;
};

const mangle = (s) => {
    return `ebrew:${s}`;
};

const start = new Date();

const rt_load = (name) => {
    if (/^math-/.test(name)) {
        name = name.slice(5);
        if (Math[name] instanceof Function) {
            return Math[name];
        } else {
            return () => Math[name];
        }
    }
    switch (name) {
        case 'apply':
            return (f, self, args) => {
                const obj = [];
                for (let i = 0; args[i] != null; i++) {
                    obj.push(args[i]);
                }
                return f.apply(self, obj);
            };
        case 'object':
            return () => {
                return new Map();
            };
        case 'set':
            return (value, key, obj) => {
                obj[key] = value;
                return value;
            };
        case 'get':
            return (key, obj) => {
                return obj[key];
            };
        case 'time':
            return () => {
                return new Date() - start;
            };
        case 'this':
            return () => {
                return window;
            };
        case 'if':
            return async (c, t, f) => {
                if (c) {
                    return await t();
                } else {
                    return await f();
                }
            };
        case 'on-draw':
            return (f) => {
                const run = () => {
                    requestAnimationFrame(run);
                    f();
                };
                requestAnimationFrame(run);
                return 0;
            };
        case 'random':
            return (low, high) => {
                return Math.floor(Math.random() * (high - low) + low);
            };
        case 'str': return (c) => {
            return String(c);
        };
        case 'while':
            return async (c, v) => {
                while (await c()) {
                    await v();
                }
            };
        case 'cat':
            return (x, y) => {
                return `${x}${y}`;
            };
        case 'not': return (x) => {
                return !x;
            };
        case 'print':
            return (a) => {
                console.log(a);
                return a;
            };
        case 'above':
            return (x, y) => {
                return x > y;
            };
        case 'equal':
            return (x, y) => {
                return y === x;
            };
        case 'add':
            return (x, y) => {
                return y + x;
            };
        case 'sub':
            return (x, y) => {
                return y - x;
            };
        case 'mul':
            return (x, y) => {
                return y * x;
            };
        case 'div':
            return (x, y) => {
                return y / x;
            };
        case 'mod':
            return (x, y) => {
                return y % x;
            };
        case 'eq':
            return (x, y) => {
                return y == x ? 1 : 0;
            };
        case 'lt':
            return (x, y) => {
                return y < x ? 1 : 0;
            };
    }
    throw new Error(`unknown: [${name}]`);
}