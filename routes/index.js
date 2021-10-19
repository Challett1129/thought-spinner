const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);



router.use((req, res) => {
    res.status(404).send('<h1>Sorry, we can\'t reach this page!<h1>');
})


module.exports = router;