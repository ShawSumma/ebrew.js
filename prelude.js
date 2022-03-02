const {read} = require('fs').promises;

const big = 1n << 64n;

let curbrk = 1n;

const mem = new Uint8Array(0);

const rt_u64 = (num) => {
    return ((num % big) + big) % big;
};

const rt_load = (name) => {
    switch (name) {
    case 'add': return (x, y) => rt_u64(y + x);
    case 'sub': return (x, y) => rt_u64(y - x);
    case 'mul': return (x, y) => rt_u64(y * x);
    case 'div': return (x, y) => rt_u64(y / x);
    case 'mod': return (x, y) => rt_u64(y % x);
    case 'shl': return (x, y) => rt_u64(y << x);
    case 'linux': return async(rdi, rsi, rdx, rcx, r8, r9, rax) => {
        switch (rax) {
            case 60:
                throw new Error(`exit: ${rax}`);
            case 12:
                if (rdi === 0) {
                    return curbrk;
                } else {
                    curbrk = rdi;
                }
            case 0:
                for (let i = rsi; i < rsi + rdx; i++) {
                    let buffer = new Uint8Array(1);
                    await read(rdi, buffer);
                    mem[i] = buffer[0];
                }
        }
    };
    }
}
