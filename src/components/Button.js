import './styles/button.css'



const Button = ({handleClick, disable, text, img})=>{


    return (
        <button  className='btn--' disabled={disable} onClick={handleClick}>
            {img&&<img className='img-button' src={img} alt='img button'/>}
            
            {text}
        </button>
    )

}

export default Button