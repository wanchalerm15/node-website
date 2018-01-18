const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const middleware = require('./middleware');
const mysql = require('./mysql');
const vueServer = require('./vueServer');
const app = express();
const port = process.env.PORT || 8080;
app.use(mysql);
app.use(vueServer);
app.use('/assets', express.static(__dirname + '/node_modules/vue/dist'))
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.engine('.html', handlebars({ extname: '.html' }));
app.set('view engine', '.html');
app.enable('view cache');
middleware(app);
app.listen(port, () => {
    console.log(`Server started port : ${port}`);
});

