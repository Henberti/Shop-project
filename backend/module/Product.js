const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('Product', productSchema)