
import { Parser } from '/src/parser.js';
import { Compiler } from '/src/compiler.js';

document.body.style.margin = '0px';
document.body.style.height = '100vh';
document.body.style.overflow = 'hidden';

fetch("eb/game.eb")
    .then(src => src.text())
    .then(async (src) => {
        const parser = new Parser(src);
        const ast = parser.readAll(src);
        for (const err of parser.errors) {
            console.log(err.msg);
        }
        const interp = new Compiler();
        const js = interp.compile(ast);
        const prelude = await (await fetch("src/prelude.js")).text();
        console.log(js);
        return Function(`${prelude}${js}`)();
    })
    .catch(e => console.error(e));
