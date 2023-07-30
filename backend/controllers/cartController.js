const { default: mongoose } = require('mongoose')
const Cart = require('../module/Cart')
const Product = require('../module/Product')


exports.getProductsInCart = (req,res)=>{
    const {cartId} = req.params

    Cart.findById(cartId).populate('items.productId')
    .then(cart=>res.status(200).json(cart))
    .catch(err=>res.status(500).json(err))

}
exports.deleteCart = (req, res) => {
    const {cartId} = req.params;
    
    Cart.findByIdAndUpdate(cartId, { items: [] }, { new: true })
        .then(updatedCart => {
            if(updatedCart) {
                res.status(200).json({success: 'Cart cleared successfully', cart: updatedCart});
            } else {
                res.status(404).json({error: 'Cart not found'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'An error occurred: ' + err.message});
        });
}


exports.addToCart =async (req,res)=>{
    const cartId = req.body.cart
    const _productId = req.body.product
    console.log('hennnn',cartId,'proD>>>>',_productId)

   const cart = await Cart.findById(cartId)
   if(!cart)return res.status(404)

   const product = cart.items.find(prod=>prod.productId.toString() === _productId)

   const isValid = mongoose.Types.ObjectId.isValid(_productId)

   let checkedObjectId =_productId

   if(!isValid)
    checkedObjectId = new mongoose.Types.ObjectId(_productId)
    

   if(product)
        product.quantity +=1;
    else
        cart.items.push({ productId: checkedObjectId, quantity: 1 })

    cart.save()

    const updatedCart =await Cart.findById(cartId).populate('items.productId')


    return res.status(200).json({'data':updatedCart})
}


exports.removeFromCart = async (req,res)=>{
    const cartId = req.body.cart
    const _productId = req.body.product

   const cart = await Cart.findById(cartId)
   if(!cart)return res.status(404)

   const products = cart.items.filter(prod=>prod.productId.toString() !== _productId)

   cart.items = [...products]

   cart.save()

   const updatedCart =await Cart.findById(cartId).populate('items.productId')

    return res.status(200).json({'data':updatedCart})
}

exports.updateQuantity = async (req, res) => {
    const cartId = req.body.cart;
    const _productId = req.body.product;
    const _inc = req.body.inc;


    let interval = 1;

    if (_inc === false)
        interval *= -1;



    const cart = await Cart.findById(cartId);
    if (!cart)
        return res.status(404).json({ error: 'Cart not found' });

    const product = cart.items.find(prod => prod.productId.toString() === _productId);

    // Check if product exists in the cart
    if (!product) {
        return res.status(404).json({ error: 'Product not found in the cart' });
    }

    product.quantity += interval;

    // Check if the quantity is still positive
    if (product.quantity <= 0) {
        // Remove the product from the cart if the quantity is 0 or less
        cart.items = cart.items.filter(prod => prod.productId.toString() !== _productId);
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: 'Product quantity updated successfully' });
}



exports.menualChangeQuantity =async (req,res)=>{
    const cartId = req.body.cart;
    const _productId = req.body.product;
    const quantity = req.body.quantity;

    console.log(cartId,_productId,quantity)

    const cart = await Cart.findById(cartId);
    if(!cart)
        return res.status(400).json({ error: 'Cart not found'});
        console.log(1)

    if (quantity <= 0){
        cart.items  = cart.items.filter(prod => prod.productId.toString() !== _productId)
        await cart.save();
        console.log(2)

 
    }
    else{
        const product = cart.items.find(prod => prod.productId.toString() === _productId);

        product.quantity = quantity;
        await cart.save();
        console.log(3)

    }
    console.log(4)


    res.status(200).json({ success: 'Product quantity updated successfully' });


  

    

    


    
    



}
