const router = require('express').Router();
const auth = require('./../../controllers/auth');
const User = require('./../../models/User')
const { validateBody, schemas } = require('./../../models/validation');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportLogin = passport.authenticate('local', {failureFlash: 'Invalid username or password.'});
const passportGoogle = passport.authenticate('googleToken',{session:false});


router.post('/register', validateBody(schemas.authSchema), (req, res) => {
    auth.register(req, res);
});

router.post('/login', (req, res, next) => {
    const email = req.body.email
    passport.authenticate('local', async (err, user, info) => {
        console.log('email', email)
        user = await User.findOne({'local.email':email})
        console.log('user', user)
      if (err) { return next(err); }
      if (user) {
        req.login(user, (err) => {
          if (err) { return next(err); }
          return res.send(userdata);
        });
      } else {
        return res.status(401).send({ error: 'There was an error logging in' });
      }
    })(req, res, next);
  });
// router.post('/login', passportLogin, (req, res) => {
//     console.log(req.user)
//     auth.login(req, res);
// });

router.get('/oauth/google', passportGoogle, (req, res) => {
    auth.googleOAuth(req, res);
});

module.exports = router;