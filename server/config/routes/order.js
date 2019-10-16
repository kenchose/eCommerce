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

router.post('/add-to-cart/:productId', (req, res, next) => {
  order.addToCart(req, res, next);
});

module.exports = router;
