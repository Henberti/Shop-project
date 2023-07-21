const router = require('express').Router()

const adminController = require('../controllers/adminController') 


router.get('/add_product',adminController.addProductView)
router.post('/add_product',adminController.addProductToDB)


module.exports = router