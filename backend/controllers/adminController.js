const Product = require('../module/Product')
const path = require('path')
const rootDir = require('../utils/root')


exports.addProductView = (req,res)=>{
    res.sendFile(path.join(rootDir,'views', 'adminView.html'))
}

exports.addProductToDB = (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const img = req.body.img;

    
    const prod = new Product({title,description,price,img})
    prod.save()
    .then(data=>res.redirect('/admin/add_product'))
    .catch(err=>res.status(500).json(err))
}

