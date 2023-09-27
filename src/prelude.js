const fakeDelay = 0;

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

const start = new Date();

const rt_load = (name) => {
    if (name.startsWith('set-')) {
        return (obj, value) => {
            obj[name.slice(4)] = value;
            return value;
        }
    }
    if (name.startsWith('on-')) {
        return (obj, cb) => {
            obj.addEventListener(name.slice(3), cb);
        };
    };
    if (name.startsWith('get-')) {
        return (obj, ...args) => {
            let f = obj[name.slice(4)];
            if (typeof f === 'function') {
                return f.apply(obj, args);
            } else {
                return f;
            }
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
        case 'time': return () => {
            return new Date() - start;
        };
        case 'this': return (v) => {
            return window;
        };
        case 'if': return async(c, t, f) => {
            if (c) {
                return await t();
            } else {
                return await f();
            }
        };
        case 'frame': return (f) => {
            const run = () => {
                requestAnimationFrame(run);
                f();
            }
            requestAnimationFrame(run);
            return 0;
        };
        case 'random': return (low, high) => {
            return Math.floor(Math.random()*(high-low)+low);
        }
        case 'str': return (c) => {
            return String(c);
        };
        case 'while': return async(c, v) => {
            while (await c()) {
                await v();
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
            return a;
        };
        case 'above': return (x, y) => {
            return x > y;
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
        case 'new-canvas': return () => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            document.body.appendChild(canvas);
            return canvas;
        };
    }
    throw new Error(`unknown: [${name}]`);
}
