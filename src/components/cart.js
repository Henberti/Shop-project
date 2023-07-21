
import { useEffect, useMemo, useRef, useState } from 'react'
import Button from './Button'
import './styles/cartStyle.css'
import {useSelector} from 'react-redux'
import ProductinList from './productInList'
import {updateCart} from '../store/index' 
import { useDispatch } from 'react-redux'
import Loader from './Loader'



const Cart = ({finished})=>{
    const dispatch = useDispatch()
    const {cartId, products} = useSelector(state=>state.cart)
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentStatus,setPaymentStatus] = useState(null)

    const wasRendered = useRef(false)

    useEffect(()=>{
       
        if(!(paymentStatus === 'complete'))return
        const timeOut = setTimeout(()=>{
            setPaymentStatus(null)
            finished()
        },1500)
        return ()=>clearTimeout(timeOut)
},[paymentStatus])

    const handlePayment =()=>{
        setPaymentStatus('pending')
        fetch(`/api/cart/delete_cart/${cartId}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res=>res.json()).then(res=>setPaymentStatus('complete'))
        .catch(err=>console.log(err))
    }



    useEffect(()=>{
        if(!cartId)return
        if(wasRendered.current)return
        wasRendered.current = true
        
        getProductsInCart()
    
    },[])

    
   

    const handleIncOrDec = (productId,is_inc,price)=>{
        handleCalculateTotalPrice(price)
        if(!productId) return
        fetch('/api/cart/update_product_quantity',{
            method:'PATCH',
            headers:{
           'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                cart:cartId,
                product:productId,
                inc:is_inc,
            }),
        }).then(res=>res.json()).then(res=>getProductsInCart())
        .catch(err=>console.log(err))
    }
    
    const getProductsInCart = ()=>{
        fetch(`/api/cart/getProducts_in_cart/${cartId}`,{
            method:'GET',
        }).then(res=>res.json()).then(res=>dispatch(updateCart(res)))
        .catch(err=>console.log(err))

    }

    const handleCalculateTotalPrice = (_total_price)=>{
        setTotalPrice(prev=>prev+_total_price)

    }
    useMemo(()=>{
        setTotalPrice(0)
        products.forEach(prod=>{
            const fixedPrice = Number(prod.productId.price)*prod.quantity
              setTotalPrice(prev=>prev+fixedPrice)
          })

    },[products])

    const handleCheckOut = (toOpen)=>{
        const modal = document.querySelector('.checkout-dialog')
        if(toOpen)
            modal.showModal()
        else
            modal.close()
    }
   
    const completeCheckout = <div>
                                <h1 style={{fontFamily:'Dancing Script, cursive',}}>total price {totalPrice}</h1>
                                    <Button text={'Complete Chekout'} handleClick={handlePayment}/>
                                    <Button text={'Exit'} handleClick={()=>handleCheckOut(false)}/>
                            </div>
                        
                         

    const paymentResived = <div><h1 style={{fontFamily:'Dancing Script, cursive',}}>Tank you for Your Prauche</h1></div>

    
    const cartPase = ()=>{
        if(!paymentStatus)
            return completeCheckout
        else
            if(paymentStatus==='complete')
                return paymentResived
            else
                return <Loader/>
    }





   


    return(
        <div>
            <header style={{textAlign:'center'}}>
            <h1><span className='title-header-cart'>CART</span></h1>
            </header>
        
        <table className='cart-table'>
            <tr className='cart-header-table'>
                <th>image</th>
                <th>title</th>
                <th>total price</th>
                <Button text={'Checkout'} handleClick={()=>handleCheckOut(true)}/>
                <div style={{position:'sticky'}}>
                <dialog className='checkout-dialog'>
                    {cartPase()}

                
                </dialog>

                </div>
                  
                
            </tr>
            {products.map(prod=>{
                return (
                <tr key={prod._id}>
                    <ProductinList  product={prod} calcutate_price={handleCalculateTotalPrice} handleUpdateQuantity={handleIncOrDec}/>
                </tr>
                )
            })}
            <tfoot>
                <td>TOTAL PRICE: <span>{totalPrice}</span></td>
            </tfoot>
            
        </table>
       </div>
    )

}
export default Cart