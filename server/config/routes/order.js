const router = require('express').Router();
const dotenv = require("dotenv").config();
const orderOrder = process.env.SECRET_SESSION_KEY;
const order = require('./../../controllers/orders');
const verify = require('./verifyToken');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportJwt = passport.authenticate('jwt', {
  session: false
});

router.get('/checkout', passportJwt, (req, res, next) => {
  order.checkout(req, res, next)
})

router.post('/charge', passportJwt, (req, res, next) => {
  order.charge(req, res, next);
});

router.get('/add-to-cart/:productId', passportJwt, (req, res, next) => {
  order.addToCart(req, res, next);
});

router.get('/cart', passportJwt, (req, res, next) => {
  order.getCart(req, res, next);
});


router.get('/remove-from-cart/:productId', passportJwt, (req, res, next) => {
  order.removeItem(req, res, next);
});

module.exports = router;
