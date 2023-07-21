const router = require('express').Router()

const productHandler = require('../controllers/productController')


router.get('/get_all_products', productHandler.getAllProducts)


module.exports = router