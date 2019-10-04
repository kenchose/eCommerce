const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  imagepath: {
    type: String,
    requirued: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
