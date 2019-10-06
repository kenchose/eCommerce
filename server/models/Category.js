const mongoose = require('mongoose');

const CategorySchcema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', CategorySchcema)
