const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const {CustomError, handleErrorSend} = require('./utils/customError')
const userRouter = require('./routers/userRoter')
const adminRouter = require('./routers/admin')
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const rootDir = require('./utils/root')


const app = express()

app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(rootDir,'public')))


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/admin',adminRouter)



app.use('*',(req,res,next)=>{
    next(new CustomError({message:'no such router for this url',statusCode:400}))
})

app.use(handleErrorSend)








mongoose.connect('mongodb+srv://hennnb:daXxom-8sozci-zotves@shopwork.ers32on.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to database')
    app.listen(8000,()=>console.log('listening on port 8000'))
})
.catch(err=>console.log(err))

