const router = require('express').Router();
const auth = require('./../../controllers/auth');

router.get('/', (req, res) => {
    res.json({route: 'first auth route works!'})
})

module.exports = router;