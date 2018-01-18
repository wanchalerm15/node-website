var Vue = require('vue');
var VueServer = require('vue-server-renderer');
var Fs = require('fs');

module.exports = function (req, res, next) {
    const path = 'views';
    const excname = 'html';
    res.renderVue = function (file, option = {}) {
        const renderer = VueServer.createRenderer();
        const template = Fs.readFileSync(`${__dirname}/${path}/${file}.${excname}`).toString('utf-8');
        const vueOption = { template };
        renderer.renderToString(new Vue(Object.assign({}, vueOption, option)), (err, html) => {
            if (err) return res.send(err.message);
            res.end(html);
        });
    };
    next();
};