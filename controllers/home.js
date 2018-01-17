const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello Express Handlebars by Nodejs'
    });
});

module.exports = router;