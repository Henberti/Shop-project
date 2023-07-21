const User = require('../module/User')
const Cart = require('../module/Cart')

const { CustomError } = require('../utils/customError')
const { checkMissingParams } = require('../utils/utilFunctions')



exports.login = (req,res,next)=>{
    const name = req.body.name 
    const email = req.body.email

    const requiredFields = {
        'name':name,
        'email':email
    }
    
    const {success,data} = checkMissingParams({requiredFields})
    if(!success)
        next(new CustomError({message:data.message, data:data.data,statusCode:400}))


    User.findOne({$and:[{'name':name,'email':email}]})
    .then(user => {
        if (user) {
            Cart.findOne(user.cart).populate('items.productId').then(cart=>{
                if(cart)
                res.json({user:user,cart:cart});
                else{
                    res.status(404).json({ message: 'Cart not found' });
                }

            })
         
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(400).json({ message: 'Internal server error' });
    });
};


exports.register =async (req,res,next)=>{

    const name = req.body.name
    const email = req.body.email

    const requiredFields = {
        'name':name,
        'email':email
    }
    const cart = new Cart({items:[]})

    await cart.save()
    

    const {success,data} = checkMissingParams({requiredFields})
    if(!success)
        next(new CustomError({message:data.message, data:data.data,statusCode:400}))

    


    const user = new User({
        name:name,
        email:email,
        cart:cart,
    })

    user.save()
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json(err))
}

