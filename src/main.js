#!/usr/bin/env node

const process = require('process');
const { Parser } = require('./parser.js');
const { Compiler } = require('./compiler.js');
const fs = require('fs').promises;

const AsyncFunction = (async()=>{}).constructor;

const compileFile = async (inpath) => {
    const buf = await fs.readFile(inpath);
    const src = String(buf);
    const parser = new Parser(src);
    const ast = parser.readAll(src);
    const interp = new Compiler();
    const js = interp.compile(ast);
    const prelude = await fs.readFile('prelude.js');
    // console.log(String(js));
    return eval(`${String(prelude)}${js}`);
};

const main = async (inpath) => {
    await compileFile(inpath);
};

main(process.argv[2])
    .catch(e => {
        throw e;
    });
