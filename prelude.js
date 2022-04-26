const fs = require('fs/promises');

const rt_str = (s) => {
    let ret = 0;
    for (let index = s.length - 1; index >= 0; index--) {
        ret = [s[index], ret];
    }
    return ret;
};

const str_rt = (p) => {
    let s = '';
    while (p !== 0) {
        s += String.fromCharCode(p[0]);
        p = p[1];
    }
    return s;
}

const main = async (n,f) => {
    let args = 0;
    for (const ent of [...process.argv.slice(n)].reverse()) {
        let arg = 0;
        for (const chr of [...ent].reverse()) {
            arg = [chr.charCodeAt(0), arg];
        }
        args = [arg, args];
    }
    return await f(args);
};

const rt_load = (name) => {
    switch (name) {
        case 'if': return async(c, t, f) => {
            if (c !== 0) {
                return await t();
            } else {
                return await f();
            }
        };
        case 'first': return (x) => {
            if (!Array.isArray(x) || x.length != 2) {
                throw Error('first on non pair: ' + x);
            }
            return x[0];
        };
        case 'second': return (y) => {
            if (!Array.isArray(y) || y.length != 2) {
                throw Error('second on non pair: ' + y);
            }
            return y[1];
        };
        case 'read-file': return async(name) => {
            const file = await fs.readFile(str_rt(name));
            return rt_str(Array.from(file));
        };
        case 'pair': return (x, y) => {
            return [x, y];
        };
        case 'putchar': return (a) => {
            process.stdout.write(String.fromCharCode(a));
            return 0;
        };
        case 'above': return (x, y) => {
            return x > y ? 1 : 0;
        };
        case 'equal': return (x, y) => {
            return y === x ? 1 : 0;
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
            return Math.floor(y / x);
        };
        case 'mod': return (x, y) => {
            return y % x;
        };
    }
    throw new Error(`unknown: [${name}]`);
}
