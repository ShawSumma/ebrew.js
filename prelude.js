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
    switch (name) {
        case 'if': return (c, t, f) => {
            if (c) {
                return t();
            } else {
                return f();
            }
        };3
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
