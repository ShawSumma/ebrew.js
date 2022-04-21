const raylib = require('raylib');

const rt_str = (s) => {
    return String.fromCharCode(...s);
}

const Exit = class extends Error {
    constructor(code) {
        super(`exit ${code}`);
        this.code = code;
    }
}

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

const rt_load = (name) => {
    if (raylib[name] != null) {
        if (raylib[name] instanceof Function) {
            return raylib[name];
        } else {
            return () => raylib[name];
        }
    }
    switch (name) {
        case 'if': return (c, t, f) => {
            if (c) {
                return t();
            } else {
                return f();
            }
        };
        case 'random': return (low, high) => {
            return Math.floor(Math.random()*(high-low)+low);
        }
        case 'str': return (c) => {
            return String(c);
        };
        case 'while': return (c, v) => {
            while (c()) {
                v();
            }
        };
        case 'get': return (o, p) => {
            return o[p];
        };
        case 'set': return (o, p, v) => {
            o[p] = v;
            return v;
        };
        case 'object': return () => {
            return {};
        };
        case 'not': return (x) => {
            return !x;
        };
        case 'print': return (a) => {
            console.log(a);
            return 0;
        };
        case 'above': return (x, y) => {
            return y > x;
        };
        case 'equal': return (x, y) => {
            return y === x;
        };
        case 'add': return (x, y) => {
            return y + x;
        };
        case 'sub': return (x, y) => {
            return y - x;
        };
        case 'mul': return (x, y) => {
            return y * x;
        };
        case 'div': return (x, y) => {
            return y / x;
        };
        case 'mod': return (x, y) => {
            return y % x;
        };
    }
    throw new Error(`unknown: [${name}]`);
}
