const router = require('express').Router();
const product = require('../../controllers/products');
const {
  validateBody,
  schemas
} = require('../../models/validation');


router.post('/create', validateBody(schemas.productSchema), (req, res, next) => {
  product.create(req, res, next);
});

router.get('/products', (req, res, next) => {
  product.getAll(req, res, next);
});

module.exports = router;
