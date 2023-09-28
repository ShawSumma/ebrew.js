import express from 'express';
import reload from 'reload';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const  app = express();

const port = 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve('./static')));

const  server = http.createServer(app);

reload(app)
    .then((res) => {
        server.listen(port, function () {
            console.log(`Web server listening on port ${port}`);
        })
    })
    .catch((err) => {
        console.error('failed', err);
    });