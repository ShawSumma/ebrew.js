import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compress from 'compression';
import ews from 'express-ws';
import chokidar from 'chokidar';

const  app = express();
app.use(compress());
const port = 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./static'));
ews(app);

const all = [];

app.ws('/ws', (ws, req) => {
    const send = (opcode, ...args) => {
        console.log('send', opcode, ...args);
        ws.send(JSON.stringify({opcode, args}));
    };

    ws.on('message', (msg) => {
        console.log(msg);
        send('nop');
    });

    all.push(send);
});

chokidar.watch('static').on('change', (path) => {
    console.log('reload', path);
    console.log(all);
    for (const ent of all) {
        ent('reload');
    }
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
