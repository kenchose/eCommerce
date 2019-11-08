const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);
