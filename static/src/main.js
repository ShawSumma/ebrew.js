
import { Parser } from '/src/parser.js';
import { Compiler } from '/src/compiler.js';

document.body.style.margin = '0px';
document.body.style.height = '100vh';
document.body.style.overflow = 'hidden';

const readFile = async (src) => {
    const res = await fetch(src);
    return String(await res.text());
};

fetch("eb/game.eb")
    .then(src => src.text())
    .then(async (src) => {
        const parser = new Parser(src, readFile);
        const ast = await parser.readAll(src);
        for (const err of parser.errors) {
            console.log(err.msg);
        }
        const interp = new Compiler();
        const js = interp.compile(ast);
        const prelude = await (await fetch("src/prelude.js")).text();
        const main = `${prelude}\n${js}`
        return Function(main)();
    })
    .catch((e) => {
        console.error(e);
    });
