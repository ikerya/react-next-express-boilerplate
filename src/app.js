const config = require('config');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(
        bodyParser.urlencoded({
            extended: true,
            limit: config.get('app:body_limit')
        })
    );

    server.use(
        express.static('static')
    );

    require('routes')(app, server);

    server.use((req, res) =>
        handle(req, res)
    );

    server.listen(
        config.get('app:port')
    );
});