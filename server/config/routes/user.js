const router = require('express').Router();
const users = require('./../../controllers/users');
const passport = require('passport');
const passportAuth = require('./../passport'); //brings in passport file and its functions so they can be used in this file
const passportJwt = passport.authenticate('jwt', { session: false }); //used for secret routes

router.get('/home', passportJwt, (req, res) => {
    users.secret(req, res);
});

module.exports = router;