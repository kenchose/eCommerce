const router = require('express').Router();
const user = require('./../../controllers/users');
const passport = require('passport');
const verify = require('./verifyToken');
const passportAuth = require('./../passport'); //brings in passport file and its functions so they can be used in this file
const passportJwt = passport.authenticate('jwt', {
  session: false
}); //used for secret routes


router.get('/one', passportJwt, (req, res, next) => {
  user.one(req, res, next);
});

router.get('/two', verify, (req, res, next) => {
  user.two(req, res, next);
});

router.get('/three', (req, res, next) => { //testing validation
  user.three(req, res, next);
});

router.post('/user/delete/:id', (req, res, next) => {
  user.deleteUser(req, res, next);
});

module.exports = router;
