const rt_str = (s) => {
    let ret = 0;
    for (let index = s.length - 1; index >= 0; index--) {
        ret = [s[index], ret];
    }
    return ret;
}

const main = async (f) => {
    return await f();
};

const rt_load = (name) => {
    switch (name) {
        case 'if': return (c, t, f) => {
            if (c !== 0) {
                return t();
            } else {
                return f();
            }
        };
        case 'first': return (x) => {
            return x[0];
        };
        case 'second': return (y) => {
            return y[1];
        };
        case 'pair': return (x, y) => {
            return [x, y];
        };
        case 'putchar': return (a) => {
            process.stdout.write(String.fromCharCode(a));
            return 0;
        };
        case 'magic-print': return (a) => {
            console.log(a);
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
