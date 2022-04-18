const fs = require('fs');

let str = 1;
let endstr = 1 << 16;
let curbrk = endstr - 1;

const mem = new ArrayBuffer(1 << 24);

const memview = new DataView(mem, 0, 1 << 24);

const strs = new Map();

const rt_str = (s) => {
    const sr = String.fromCharCode(...s);
    if (strs[sr] != null) {
        return strs[sr];
    }
    const ret = str;
    for (const i of s) {
        memview.setUint8(str++, i);
    }
    memview.setUint8(str++, 0);
    strs[sr] = ret;
    return ret;
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
    switch (name) {
        case 'if': return (c, t, f) => {
            if (c) {
                return t();
            } else {
                return f();
            }
        };
        case 'print': return (a) => {
            console.log(a);
            return 0;
        };
        case 'above': return (x, y) => {
            return y > x ? 1 : 0;
        };
        case 'equal': return (x, y) => {
            return y === x ? 1 : 0;
        };
        case 'add': return (x, y) => {
            return y + x|0;
        };
        case 'sub': return (x, y) => {
            return y - x|0;
        };
        case 'mul': return (x, y) => {
            return y * x|0;
        };
        case 'div': return (x, y) => {
            return y / x|0;
        };
        case 'mod': return (x, y) => {
            return y % x|0;
        };
    }
    throw new Error(`unknown: [${name}]`);
}
