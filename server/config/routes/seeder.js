const router = require('express').Router();
const faker = require('faker');
const Product = require('./../../models/Product');
const Category = require('./../../models/Category');

router.get('/', function (req, res, next) {
  const categories = ["Baby", "Men", "Womaen", "Movies", "Shoes", "Books", "Electronics", "Computers", "Kids", "Sports"];
  for (let i = 0; i < 100; i++) {
    let product = new Product({
      imagePath: "https://images-na.ssl-images-amazon.com/images/I/4196ru-rkjL.jpg",
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.paragraph(),
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
