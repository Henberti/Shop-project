import './styles/headerStyle.css'
import CartImage from '../assets/icons/shoping_bag.jpg'
import UserIcon from '../assets/icons/user_icon.jpg'
import ImageIcon from './imageIcon' 
import { useState } from 'react'
import PopUp from './PopUp'
import Cart from './cart'
import Login_Register from './login_register'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { logout } from '../store'

const Header = ()=>{
    const dispatch = useDispatch()
    const [isOpenModel, setIsOpenModel] = useState(false)
    const [whatRender,setWhatRender] = useState('')

    const {name} = useSelector(state=>state.user)

    const handleOpenModel = (modalName)=>{
        if(modalName==='user'&&name){
           const modal = document.querySelector('dialog')
           modal.show()
           return
        }
        setWhatRender(modalName)
        setIsOpenModel(true) 
    }
    const handleDisconnect = (toDisconnect)=>{
        if(toDisconnect)
            dispatch(logout())
       const modal = document.querySelector('dialog')
       modal.close()
    }
    


    return(
        <div>
        <div className='header-box'>
            <div className='header-title'>
                <h1>Moto Matrix</h1>
                <p> by hen && eliran</p>
            </div>

            <div className='header-buttons'>
                <div className='user-button'>
                    <ImageIcon icon={UserIcon} onClick={()=>handleOpenModel('user')}/>
                    <div className='user-name-login'>
                        <h3><span className='span-username'>{name}</span></h3>
                    </div>
                    <dialog>
                        <h4>Do you want to dissconnect</h4>
                        <Button text={'YES'} handleClick={()=>handleDisconnect(true)}/>
                        <Button text={'NO'} handleClick={()=>handleDisconnect(false)}/>
                    </dialog>
                
                </div>
                <div className='cart-button'>
                    <ImageIcon icon={CartImage} onClick={()=>handleOpenModel('cart')}/>
                </div>
            </div>
           
     


        </div>
        {isOpenModel&& <PopUp Component={(whatRender==='user'||(!name))?<Login_Register finised={()=>setIsOpenModel(false)}/>:<Cart finished={(()=>setIsOpenModel(false))}/>} isOpened={isOpenModel} setClose={()=>setIsOpenModel(false)}/>}
        </div>
    )
}

export default Header