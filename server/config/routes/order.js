const router = require('express').Router();
const order = require('./../../controllers/orders');
const passport = require('passport');
const passportAuth = require('./../passport');
const passportJwt = passport.authenticate('jwt', {
  session: false
});

router.get('/orders', (req, res, next) => {
  order.allOrders(req, res, next);
});

router.get('/add-to-cart/:productId/:qty', passportJwt, (req, res, next) => {
  order.addToCart(req, res, next);
});

router.get('/cart', passportJwt, (req, res, next) => {
  order.getCart(req, res, next);
});


router.get('/remove-from-cart/:productId', passportJwt, (req, res, next) => {
  order.removeItem(req, res, next);
});

module.exports = router;
