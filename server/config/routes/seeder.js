const router = require('express').Router();
const faker = require('faker');
const Product = require('./../../models/Product');

router.get('/', function (req, res, next) {
  const categories = ["Outdoor Gear", "Men", "Womaen", "Shoes", "Kids", "Sportswear", "Tops", "Bottoms", "Accessories"];
  for (let i = 0; i < 100; i++) {
    let product = new Product({
      imagePath: faker.image.image(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence(),
      category: categories[Math.floor(Math.random() * categories.length)]
    });

    product.save();
  }
  for (let i = 0; i < categories.length; i++) {
    let cat = new Category({
      title: categories[i]
    });
    cat.save();
  }
  res.redirect('/cartify')
});

module.exports = router;
