const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref:'Cart',
        require:true
    }
})

module.exports = mongoose.model('User',userSchema)