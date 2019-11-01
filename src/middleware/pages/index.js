module.exports = app => {
    return (req, res) => {
        app.render(req, res, '/index', req.query);
    };
};