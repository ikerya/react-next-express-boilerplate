module.exports = (server, app) => {
    server.get('/', require('middleware/pages/index')(app) );
};