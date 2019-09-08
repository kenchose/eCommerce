const router = require('express').Router();
const auth = require('./../../controllers/auth');
const passport = require('passport');
const passportAuth = require('./../passport'); //brings in passport file and its functions so they can be used in this file
const passportLogin = passport.authenticate('local', {session:false});


router.post('/register', (req, res) => {
    auth.register(req, res);
});

router.post('/login', passportLogin, (req, res) => {
    auth.login(req, res);
});


module.exports = router;