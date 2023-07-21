import { useEffect, useState } from "react"
import './styles/notification.css'
import {useSelector, useDispatch} from 'react-redux'
import { clearNotification } from "../store"



const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const [className,setClassName]  = useState('notification-hide')


   

    useEffect(() => {
        setClassName('notification')
        const timOutDispatch =setTimeout(() => {
            dispatch(clearNotification())
        }, 2400)
        const timOut =setTimeout(() => {
           setClassName('notification-hide')
            
           
        }, 1500)

        return () =>{
            clearTimeout(timOut)
            clearTimeout(timOutDispatch)

        } 
    },[notification])

    if(notification === '') return 

    


    return (
        <div className={className} >
            <h2>{notification}</h2>
        </div>
    )

}
export default Notification
