const router = require('express').Router();
const order = require('./../../controllers/orders');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportJwt = passport.authenticate('jwt', {
  session: false
});

router.post('/add-to-cart/:id', passportJwt, (req, res, next) => {
  order.addToCart(req, res, next);
});

module.exports = router;
