const router = require('express').Router();
const users = require('./../../controllers/users');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportJwt = passport.authenticate('jwt', { session: false });

module.exports = router;