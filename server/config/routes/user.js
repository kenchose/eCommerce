const router = require('express').Router();
const user = require('./../../controllers/users');
const passport = require('passport');
const passportAuth = require('./../passport'); //brings in passport file and its functions so they can be used in this file
const passportJwt = passport.authenticate('jwt', { session: false }); //used for secret routes

router.get('/home/one', passportJwt, (req, res, next) => { //testing validation
    user.okie(req, res, next);
});

router.get('/home/:id', (req, res, next) => {
    user.home(req, res, next);
});

router.post('/user/delete/:id', (req, res, next) => {
    user.deleteUser(req, res, next)
})

module.exports = router;