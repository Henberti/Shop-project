import './styles/productBoxStyle.css'
import shoping_cart from '../assets/icons/shopping-cart-icon.jpg'





const ProductBox = ({id, image, description, price, title, alt,addToCart})=>{


    return (
        <div className="product-box">
            <div className="product-image">
                <img src={image} alt={alt}/>
                <div className="product-info-title">
                    <p>{title}</p>
                </div>
               
            </div>
            <div className="product-info">
                <div className="product-info-description">
                    <p><span style={{fontWeight:'bold', textDecoration:'underline'}}>Description:</span><br/>{description}</p>
                </div>
                <div className='bottom-grid-level' style={{display:'grid', gridTemplateColumns:'1fr 1fr', position:'relative'}}>
                <div className="price">
                    <p style={{marginRight:'10px', display:'inline', fontWeight:'500'}}>Price:</p>
                    <p style={{display:'inline', fontSize:'small', overflow:'hidden'}}>{price}$</p>
                </div>
                <button  className='btn-press-add-to-cart' onClick={()=>addToCart(id)}>
                    <div className='btn-add-to-cart'>
                        <p>Add to cart</p>
                        <img className='img-shopping-cart' src={shoping_cart} alt='shopping cart'/>
                    </div>
                </button>
                </div>
                
            </div>
        </div>
    )

}

export default ProductBox