const router = require('express').Router();
const auth = require('./../../controllers/auth');
const {
  validateBody,
  schemas
} = require('./../../models/validation');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
});

router.post('/register', validateBody(schemas.authSchema), (req, res, next) => {
  auth.register(req, res, next);
});

router.post('/login', (req, res, next) => { //no validation for better security
  auth.login(req, res, next);
});

router.get('/google', passportGoogle);

// // callback route for google redirect
router.get('/google/redirect', passport.authenticate('google', {
  session: false
}), (req, res, next) => {
  auth.googleOAuth(req, res, next);
})

module.exports = router;
