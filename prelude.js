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
    if (/^math-/.test(name)) {
        name = name.slice(5);
        if (Math[name] instanceof Function) {
            return Math[name];
        } else {
            return () => Math[name];
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
        case 'time-seconds': {
            return () => new Date().getSeconds();
        };
        case 'time-minutes': {
            return () => new Date().getMinutes();
        };
        case 'time-hours': {
            return () => new Date().getHours();
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
        case 'cat': return (x, y) => {
            return `${x}${y}`;
        }
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
