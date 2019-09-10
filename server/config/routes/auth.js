const router = require('express').Router();
const auth = require('./../../controllers/auth');
const { validateBody, schemas } = require('./../../models/validation');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportLogin = passport.authenticate('local', {session:false});
const passportGoogle = passport.authenticate('googleToken',{session:false});


router.post('/register', validateBody(schemas.authSchema), (req, res) => {
    auth.register(req, res);
});

router.post('/login', passportLogin, (req, res) => {
    auth.login(req, res);
});

router.get('/oauth/google', passportGoogle, (req, res) => {
    auth.googleOAuth(req, res);
});

module.exports = router;