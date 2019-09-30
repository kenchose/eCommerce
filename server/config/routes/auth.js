const router = require('express').Router();
const auth = require('./../../controllers/auth');
const {
  validateBody,
  schemas
} = require('./../../models/validation');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportGoogle = passport.authenticate('googleToken', {
  session: false
});

router.post('/register', validateBody(schemas.authSchema), (req, res, next) => {
  auth.register(req, res, next);
});

router.post('/login', (req, res, next) => { //no validation for better security
  auth.login(req, res, next);
});

router.get('/oauth/google', passportGoogle, (req, res, next) => {
  auth.googleOAuth(req, res);
});

module.exports = router;
