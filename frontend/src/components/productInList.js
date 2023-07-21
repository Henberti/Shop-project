import { useEffect, useState } from "react"
import AddRemoveBtn from "./AddRemoveBtn"
import './styles/product_in_list.css'



const ProductInList = ({product, handleUpdateQuantity})=>{
    const {_id,title,price,img} = product.productId
    const {quantity} = product
    const numberPrice = Number(price)

    const [totalPrice,setToTalPrice] = useState(0)


    useEffect(()=>{
        const _totalPrice = Number((numberPrice*quantity).toFixed(2))
        setToTalPrice(_totalPrice)
        

    },[quantity])




  




    return (
        <div className="list-product-box">
                <td className="img-td"><img src={img}/></td>
                <td className="title-td"><p>{title}</p></td>
                <td className="price-td">{totalPrice}</td>
                <tb className='add-remove-product'>
                    <AddRemoveBtn onClick={()=>handleUpdateQuantity(_id,false,(numberPrice*-1))} />
                    <p style={{display:'inline', marginLeft:'5px', marginRight:'5px', fontFamily:'cursive', fontSize:'x-large'}}>{quantity}</p>
                    <AddRemoveBtn plus={true} onClick={()=>handleUpdateQuantity(_id,true,numberPrice)}/>
                </tb>

                <div style={{display:'flex', justifyContent:'center'}}>
            
        </div>
        </div>
    )
  

   



}


export default ProductInList