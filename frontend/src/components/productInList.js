import { useEffect, useState } from "react"
import AddRemoveBtn from "./AddRemoveBtn"
import './styles/product_in_list.css'



const ProductInList = ({product, handleUpdateQuantity, handleChangeQuantity:handleQuantityManual})=>{
    const {_id,title,price,img} = product.productId
    const {quantity} = product
    const numberPrice = Number(price)

    const [totalPrice,setToTalPrice] = useState(0)
    const [isInput,setIsInput] = useState(false)
    const [quantityChange,setQuantityChange] = useState(quantity)


    useEffect(()=>{
        const _totalPrice = Number((numberPrice*quantity).toFixed(2))
        setToTalPrice(_totalPrice)
        

    },[quantity])

    const handleInput = ()=>{
        setIsInput(prev=>!prev)

    }
    const handleChangeQuantity = ({currentTarget:input})=>{
        const {value} = input;

        setQuantityChange(value)


    }

    const submitNewQuantity = ()=>{
        const calcPrice = (quantityChange-quantity)*numberPrice
        handleQuantityManual(_id,calcPrice,quantityChange)

        handleInput()

    }




  




    return (
        <div className="list-product-box">
                <td className="img-td"><img src={img}/></td>
                <td className="title-td"><p>{title}</p></td>
                <td className="price-td">{totalPrice}</td>
                <tb className='add-remove-product'>
                    <AddRemoveBtn onClick={()=>handleUpdateQuantity(_id,false,(numberPrice*-1))} />
                    {isInput?(
                    <div>
                    <button onClick={submitNewQuantity} className="btn-quantity" >submit</button>

                   
                    <input name='quantity' onChange={handleChangeQuantity} value={quantityChange} className="input-quantity" type="number"></input>
                    </div>)
                    :
                    <p onClick={handleInput} style={{display:'inline', marginLeft:'5px', marginRight:'5px', fontFamily:'cursive', fontSize:'x-large'}}>{quantity}</p>
                    }
                    <AddRemoveBtn plus={true} onClick={()=>handleUpdateQuantity(_id,true,numberPrice)}/>
                </tb>

                <div style={{display:'flex', justifyContent:'center'}}>
            
        </div>
        </div>
    )
  

   



}


export default ProductInList