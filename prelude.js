const fss = require('fs');
const fs = require('fs').promises;

const big = 1n << 64n;

let str = 1n;
let endstr = 1n << 16n;
let curbrk = endstr - 1n;

const mem = new ArrayBuffer(1 << 24);

const memview = new DataView(mem, 0, 1 << 24);

const rt_u64 = (num) => {
    return ((BigInt(num) % big) + big) % big;
};

const strs = new Map();

const rt_str = (s) => {
    const sr = String.fromCharCode(...s);
    if (strs[sr] != null) {
        return strs[sr];
    }
    const ret = str;
    for (const i of s) {
        memview.setUint8(Number(str++), i);
    }
    memview.setUint8(Number(str++), 0);
    strs[sr] = ret;
    return ret;
}

const rt_load = (name) => {
    switch (name) {
        case 'word': return () => 8n;
        case 'peek': return (n) => {
            return BigInt(memview.getUint8(Number(n)));
        } 
        case 'poke': return (n, v) => {
            memview.setUint8(Number(n), Number(v) % 256);
        }
        case 'neg': return (n) => rt_u64(-n);
        case 'not': return (n) => n===0n?1n:0n;
        case 'cmpa': return (x, y) => y > x ? 1n : 0n;
        case 'cmpe': return (x, y) => y === x ? 1n : 0n;
        case 'load': return (n) => {
            return BigInt(memview.getBigUint64(Number(n)));
        }
        case 'store': return (n, v) => {
            memview.setBigUint64(Number(n), v);
            return v;
        }
        case 'add': return (x, y) => {
            return rt_u64(y + x);
        }
        case 'sub': return (x, y) => {
            return rt_u64(y - x);
        }
        case 'mul': return (x, y) => {
            return rt_u64(y * x);
        }
        case 'div': return (x, y) => {
            return rt_u64(y / x);
        }
        case 'mod': return (x, y) => {
            return rt_u64(y % x);
        }
        case 'shl': return (x, y) => {
            return rt_u64(y << x);
        }
        case 'linux': return (rdi, rsi, rdx, rcx, r8, r9, rax) => {
            switch (rax) {
                case 60n:
                    if (rdi === 0n) {
                        return 0n; 
                    }
                    throw new Error(`exit: ${rdi}`);
                case 12n:
                    if (rdi !== 0n) {
                        curbrk = rdi;
                    }
                    return curbrk;
                case 0n:
                    const maxi = rt_u64(rsi + rdx)
                    for (let i = rsi; i < maxi; i++) {
                        let buffer = new Uint8Array(1);
                        fss.readSync(Number(rdi), buffer);
                        if (buffer[0] === 0) {

                            return i - rsi;
                        }
                        memview.setUint8(Number(i), buffer[0]);
                    }
                    return rdx;
                case 1n:
                    const maxo = rt_u64(rsi + rdx);
                    for (let i = rsi; i < maxo; i++) {
                        fss.writeSync(Number(rdi), String.fromCharCode(memview.getUint8(Number(i))));
                    }
                    return rdx;
                default:
                    throw new Error(`cannot emulate syscall: ${rax}`);
            }
        };
    }
    throw new Error(`unknown: [${name}]`);
}
