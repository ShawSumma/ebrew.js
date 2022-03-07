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

const rt_load = (name) => {
    switch (name) {
        case 'word': return () => 5;
        case 'peek': return (n) => {
            return memview.getUint8(n);
        };
        case 'poke': return (n, v) => {
            memview.setUint8(n, v & 0xFF);
        };
        case 'neg': return (n) => -n|0;
        case 'not': return (n) => n === 0 ? 1 : 0;
        case 'cmpa': return (x, y) => {
            return y > x ? 1 : 0;
        };
        case 'cmpe': return (x, y) => {
            return y === x ? 1 : 0;
        };
        case 'load': return (n) => {
            return memview.getUint32(n);
        };
        case 'store': return (n, v) => {
            memview.setUint32(n, v);
            return v;
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
        case 'shl': return (x, y) => {
            return y << x|0;
        };
        case 'linux': return (rdi, rsi, rdx, rcx, r8, r9, rax) => {
            switch (rax) {
                case 60n:
                    throw new Error(`exit: ${rdi}`);
                case 12:
                    if (rdi !== 0) {
                        curbrk = rdi;
                    }
                    return curbrk;
                case 0:
                    let head = 0;
                    outer: while (head < rdx) {
                        let buffer = new Uint8Array(1024);
                        fs.readSync(rdi, buffer);
                        for (const chr of buffer) {
                            if (chr === 0) {
                                break outer;
                            }
                            memview.setUint8(head, chr);
                        }
                        memview.setUint8(head + rsi, buffer[0]);
                    }
                    return head;
                case 1:
                    const maxo = rsi + rdx;
                    let out = '';
                    for (let i = rsi; i < maxo; i++) {
                        out += String.fromCharCode(memview.getUint8(i));
                    }
                    fs.writeSync(rdi, out);
                    return rdx;
                default:
                    throw new Error(`cannot emulate syscall: ${rax}`);
            }
        };
    }
    throw new Error(`unknown: [${name}]`);
}
