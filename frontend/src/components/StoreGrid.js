import './styles/store_grid.css'
import ProductBox from './ProductBox'
import Button from './Button'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {updateCart, setNotification} from '../store/index'

const StoreGrid = ()=>{
  const dispatch = useDispatch()
    const [page,setPage] = useState(1)
    const [arrayOfProducts, setArrayOfProducts] = useState([])
    const [maxSize,setMaxSize] = useState(0)
    const {cartId} = useSelector(state=>state.cart)


 


    useEffect(()=>{
  
      fetch('/api/product/get_all_products',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then(res=>res.json()).then(res=>{
        setArrayOfProducts(res)
        setMaxSize(res.length)
      })
      .catch(err=>console.log(err))

    },[])


    const handleAddToCart = (productId)=>{
      if(!cartId)
        dispatch(setNotification('You need to login first'))
      
      if(!productId || !cartId )return
      fetch('/api/cart/add_to_cart',{
        method:'POST',
        headers:{
           'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          
          cart:cartId,
          product:productId,
        }),
      }).then(res=>res.json()).then(res=>dispatch(updateCart(res.data))).then(()=>dispatch(setNotification('Product added to cart')))
      .catch(err=>console.log(err))
    }




  

    return (
        <div className='store-wrapper'>
            <div className='store-view-box' >
                {arrayOfProducts.slice((page-1)*8, (page*8)).map(prod=>{

                  return (
                    <div key={prod._id}>
                      <ProductBox 
                        id={prod._id}
                        image={prod.img}
                        title={prod.title}
                        description={prod.description}
                        price={Number(prod.price)}
                        addToCart={handleAddToCart}
                        />

                    </div>
                  )
                })}
               
                </div>
                <div className='extend-bottom'>
                    <div className='buttons-down'>

                        {<Button disable={page<=1} handleClick={()=>setPage(prev=>prev-1)} text={'Previuos Page'}/>}
                        <p style={{display:'inline', marginLeft:'5px', marginRight:'5px', fontFamily:'cursive', fontSize:'x-large'}}>{page}</p>
                        {<Button disable={(page*8 >maxSize)} handleClick={()=>setPage(prev=>prev+1)} text={'Next Page'}/>}
                    </div>
            </div>
         
        

           
        </div>
    )

}
export default StoreGrid