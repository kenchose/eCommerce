const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    },
    quantity:{
        type:Number,
        default: 1
    }
})