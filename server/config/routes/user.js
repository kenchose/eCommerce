const router = require('express').Router();
const users = require('./../../controllers/users');

router.get('/', (req, res) => {
    res.json({work:"user route works!"});
})

module.exports = router;