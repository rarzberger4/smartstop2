const { Router } = require('express');

const router = new Router();

router.post('/contact', (req, res) => {
    console.log(req.body);
    res.redirect('/index.html');
});

module.exports = router;