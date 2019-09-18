const router = require('express').Router();
const auth = require('./../../controllers/auth');
const User = require('./../../models/User')
const { validateBody, schemas } = require('./../../models/validation');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportLogin = passport.authenticate('local', {session:false});
const passportGoogle = passport.authenticate('googleToken',{session:false});


router.post('/register', validateBody(schemas.authSchema), (req, res) => {
    auth.register(req, res);
});

router.post('/login', passportLogin, (req, res) => {
    console.log('will this work', req.body)
    auth.login(req, res);
});

router.get('/oauth/google', passportGoogle, (req, res) => {
    auth.googleOAuth(req, res);
});

router.post('/logout', (req, res) => {
    auth.logout(req, res);
});

module.exports = router;