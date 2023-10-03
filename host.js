import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compress from 'compression';
import ews from 'express-ws';
import chokidar from 'chokidar';

const  app = express();
app.use(compress());
const port = 8000;

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./static'));
ews(app);

const tickrate = 20;

let id = 0;
let all = [];

const parser = {};

parser.number = (d) => {
    if (typeof d === 'number') {
        return Number(d);
    }
    throw new Error('parse error: expected number');
};

parser.boolean = (d) => {
    if (typeof d === 'number') {
        return d !== 0;
    }
    if (typeof d === 'boolean') {
        return d ;
    }
    throw new Error('parse error: expected number');
};

const check = (parser) => (untrusted) => {
    if (typeof parser === 'object' && parser != null) {
        if (typeof untrusted !== 'object' || untrusted == null) {
            throw new Error('parse error: expected object');
        }
        const ret = {};
        const keys = Object.keys(untrusted);
        for (const [key, value] of Object.entries(parser)) {
            if (keys.indexOf(key) === -1) {
                throw Error(`parse error: expected key ${key}`);
            }
            ret[key] = value(untrusted[key]);
        }
        return ret;
    }
    if (typeof parser === 'function') {
        return parser(untrusted);
    }
    throw new Error(`parse error: bad parser`);
};

parser.player = check({
    'pos-y': parser.number,
    'vel-y': parser.number,
    'acc-y': parser.number,
    'is-paused': parser.boolean,
    'is-dead': parser.boolean,
    'hue': parser.number,
});

let javelins = [];
let n = 0;

setInterval(() => {
    let next = []
    for (const j of javelins) {
        j['pos-x'] -= 1;
        if (j['pos-x'] >= -10) {
            next.push(j);
        }
    }
    javelins = next;
    for (const ent of all) {
        ent.javelins(javelins);
    }
    if (n % 5 == 0) {
        javelins.push({
            "pos-x": 110,
            "pos-y": Math.floor(Math.random() * 98 + 1) - 0.5,
        });
    }
    n += 1;
}, 50);

app.ws('/ws', (ws, req) => {
    const send = (opcode, ...args) => {
        // console.log('send', opcode, ...args);
        ws.send(JSON.stringify({opcode, args}));
    };

    const myid = ++id;

    const player = (other) => {
        if (other.id === myid) {
            return;
        }
        // console.log(`send player ${other.id} to player ${myid}`)
        send('player', other);
    };

    const close =  () => {
        send('reset');
    };

    const javelins = (arr) => {
        send('javelins', arr);
    };

    ws.on('message', (obj) => {
        const {opcode, args} = JSON.parse(obj);
        switch (opcode) {
            case 'self': {
                try {
                    const player = parser.player(args[0]);
                    player["id"] = myid;
                    for (const ent of all) {
                        ent.player(player);
                    }
                } catch (e) {
                    console.error(e);
                }
                break;
            }
            default: {
                console.log(opcode);
                break;
            }
        }
    });

    all.push({close, player, javelins, id});

    ws.on('close', () => {
        let next = [];
        for (const ent of all) {
            if (ent.id !== myid) {
                next.push(ent);
            }
        }
        all = next;
        console.log(`player ${myid} left`);
    });

    console.log(`player ${myid} joined`);
});

chokidar.watch('static').on('change', (path) => {
    for (const ent of all) {
        ent.close();
    }
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
