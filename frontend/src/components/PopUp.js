import Button from './Button'
import {useEffect} from 'react'
import './styles/popupStyle.css'

const PopUp = ({Component, isOpened, setClose})=>{


    const handleCloseModel = ()=>{
        setClose()
    }

    return (
        <div className='dialog'>
            <div className='component-box'>
            {Component}
            </div>
            <div className='close-div'>
            <Button text={'Close'} handleClick={handleCloseModel}/>
            </div>
        </div>
    )
}

export default PopUp