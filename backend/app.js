const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const prod_list = require('./data')
const product = require('./module/Product')
const {CustomError, handleErrorSend} = require('./utils/customError')
const userRouter = require('./routers/userRoter')
const adminRouter = require('./routers/admin')
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const rootDir = require('./utils/root')


//Hen Berti 201381407 && Eliran Belaish 207598467

/*
I used mongoose to handle the collections and the function in my app
all the data that my app need including the products of the store is stored in the DB
I created 3 collections or schemas
1. users collection:
    each user have unique cart login or sign in is very simple
    if the name and the email as a unique key is not present in the DB
    it will create new record and have new cart for the new user
2. product collection:
    this collection holds all the products in the store to offer
    new products can easily add direct from the endpoint [backend-url]/admin//add_product
3. cart collection:
    this collection have reference to the user collection and each user have one cart
* */

const app = express()

app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(rootDir,'public')))

//this is for handling all the routers
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/admin',adminRouter)


//uncomment this to drop data to other collection this to move
// app.use('/insert',async(req,res)=>{
//   await  product.insertMany(prod_list)
//   res.json('haleloya')
// })


//this is for error handling
app.use('*',(req,res,next)=>{
    next(new CustomError({message:'no such router for this url',statusCode:400}))
})

app.use(handleErrorSend)







//this is for connecting to database
mongoose.connect('mongodb+srv://hennnb:daXxom-8sozci-zotves@shopwork.ers32on.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to database')
    app.listen(8000,()=>console.log('listening on port 8000'))
})
.catch(err=>console.log(err))

