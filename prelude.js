const raylib = require('raylib');
const ws = require('ws');

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

raylib.SetTraceLogLevel(raylib.LOG_WARNING);

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
    if (/^on-/.test(name)) {
        return (ws, f) => {
            ws.on(name.slice(3), (...args) => {
                return f(...args);
            });  
        };
    }
    switch (name) {
        case 'if': return async(c, t, f) => {
            if (c) {
                return await t();
            } else {
                return await f();
            }
        };
        case 'wss-new': return (port) => {
            return new ws.WebSocketServer({
                port,
            });
        };
        case 'stop-interval': return (n) => {
            clearInterval(n);
            return 0;
        };
        case 'start-interval': return (ms, f) => {
            return setInterval(f, ms);
        };
        case 'ws-send': return (ws, obj) => {
            if (fakeDelay === 0) {
                ws.send(obj);
            } else {
                setTimeout(() => ws.send(obj), fakeDelay);
            }
        };
        case 'ws-new': return (ip) => {
            return new ws.WebSocket(ip, {});
        };
        case 'from-json': return (s) => {
            return JSON.parse(String(s));
        }
        case 'to-json': return (o) => {
            return JSON.stringify(o);
        };
        case 'get-time': return () => {
            return (new Date()).getTime();
        };
        case 'time-seconds': return () => {
            return () => new Date().getSeconds();
        };
        case 'time-minutes': return () => {
            return () => new Date().getMinutes();
        };
        case 'time-hours': return () => {
            return () => new Date().getHours();
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
            return 0;
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
    }
    throw new Error(`unknown: [${name}]`);
}
