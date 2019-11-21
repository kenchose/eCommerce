const router = require('express').Router();
const user = require('./../../controllers/users');
const passport = require('passport');
const verify = require('./verifyToken');
const passportAuth = require('./../passport'); //brings in passport file and its functions so they can be used in this file
const passportJwt = passport.authenticate('jwt', {
  session: false
}); //used for secret routes

router.get('/user/:id', passportJwt, (req, res, next) => {
  user.currUser(req, res, next);
});

router.put('/user/edit/:userId', passportJwt, (req, res, next) => {
  user.editUser(req, res, next);
});

router.post('/delete/:id', passportJwt, (req, res, next) => {
  user.deleteUser(req, res, next);
});

module.exports = router;
