const Product = require('./../models/Product');
const Cart = require('./../models/Cart').default

module.exports = {
  create: async (req, res, next) => {
    const {
      imagePath,
      name,
      price,
      description,
      category
    } = req.body;

    //check if product already exist (by name)
    const productExist = await Product.findOne({
      "name": name
    });
    if (productExist) return res.status(400).send("Product already in your inventory");

    try {
      //if new product
      const newProduct = new Product({
        imagePath,
        name,
        price,
        description,
        category
      });
      const product = await newProduct.save();
      res.status(200).json({
        product
      })
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getAll: async (req, res, next) => {
    const products = await Product.find({});
    try {
      if (!products) return res.status(400).json({
        success: false,
        message: "Cannot find products"
      });
      if (products) return res.status(200).json({
        products: products
      });
    } catch (error) {
      res.status(400).send(error)
    }
  },

  onlyOne: async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById({
      _id: id
    });
    try {
      if (!product) return res.status(400).json({
        success: false,
        message: "No product found"
      });
      if (product) return res.status(200).json({
        product
      });
    } catch (error) {
      res.status(400).send(error);
    };
  },

  editProduct: async (req, res, next) => {
    const id = req.params._id
    const {
      category,
      name,
      pricce
    } = Product.findById({
      _id: id
    });
  },

  addToCart: async (req, res, next) => {
    const productId = req.params.id;
    console.log('sessions', req.session)
    const product = await Product.findById({
      _id: productId
    });
    if (!product) return res.status(400).send("No product found");
    try {
      let cart = new Cart(req.session.cart ? req.session.cart : {});
      console.log('cart', cart);
      console.log('this is product', product)
      cart.add(product, product.id)
      req.session.cart = cart;
      console.log('ccart session', cart);
    } catch (error) {
      res.status(400).send(error);
    };
  }
  // addToCart: (req, res, next) => {
  //   let productId = req.params.id;
  //   console.log('sessions', req.session)

  //   let cart = new Cart(req.session.cart ? req.session.cart : {});
  //   Product.findById(
  //     productId, (err, product) => {
  //       console.log('this is product', product)
  //       if (err) return res.send("Product not found");
  //       cart.add(product, product.id);
  //       req.session.cart = cart;
  //       console.log('cart session', req.session.cart);
  //     })
  // }
}
