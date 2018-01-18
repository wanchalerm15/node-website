const router = require('express').Router();

router.get('/', (req, res) => {
    res.renderVue('home/index');
});

module.exports = router;