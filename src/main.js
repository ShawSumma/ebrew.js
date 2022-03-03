const { Parser } = require('./parser.js');
const { Compiler } = require('./compiler.js');
const fs = require('fs').promises;

const main = async (inpath, outpath) => {
    const buf = await fs.readFile(inpath);
    const src = String(buf);
    const parser = new Parser(src);
    const ast = parser.readDefs(src);
    const interp = new Compiler();
    const js = interp.compile(ast);
    const prelude = await fs.readFile('prelude.js');
    fs.writeFile(outpath, String(prelude) + js);
};

main(`ebrew/ebrew.eb`, `out.js`);
