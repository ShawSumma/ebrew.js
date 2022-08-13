import Rete from 'rete';

export const numSocket = new Rete.Socket("Number");

export const NumComponent = class extends Rete.Component {
    constructor() {
        super("Number");
    }

    builder(node) {
        const out = new Rete.Output("num", "Number", numSocket);
        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs["num"] = node.data.num;
    }
};
