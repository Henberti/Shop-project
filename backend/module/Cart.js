const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    items: [{
        productId:{
            type: Schema.Types.ObjectId,
            ref:'Product',
            require: true
        },
        quantity:{
            type:Number,
            require:true,
        }
    }]

})

module.exports = mongoose.model('Cart',cartSchema)