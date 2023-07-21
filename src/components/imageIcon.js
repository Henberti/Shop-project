import './styles/imageIconStyle.css'

const ImageIcon =({icon, onClick})=>{

    return (
        <button className='icon-btn' onClick={onClick}>
           
                <img className='icon-btn-img' src={icon}/>


        </button>
    )
}

export default ImageIcon