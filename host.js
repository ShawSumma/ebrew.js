import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compress from 'compression';

const  app = express();
app.use(compress());
const port = 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./static'));

app.listen(port, function () {
    console.log(`Web server listening on port ${port}`);
});
