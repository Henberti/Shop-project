import { useState } from 'react'
import Button from './Button'
import './styles/loginStyle.css'
import { useUserFetch } from '../hooks/userHooks'
import { useDispatch } from 'react-redux'
import { login as loginUser, setCart } from '../store'




const Login_Register = ({finised})=>{

    const {login, register} = useUserFetch()
    const dispatch = useDispatch()

    const [userData,setUserData] = useState({})
    const [isNewUser,setIsNewUser] = useState(false)

    const handleChange = ({currentTarget:input})=>{
        const {value,name} = input
        setUserData(prev=>({...prev,[name]:value}))
    }

    const handleLogin = (event)=>{
        event.preventDefault()
        login(userData)
        .then(res=>{
            if(res.status===404){
                setIsNewUser(true)
                throw new Error('user not found')
            }
            return res.json()
        })
        .then(res=>{
            dispatch(loginUser(res.user))
            dispatch(setCart(res.cart))
            finised()

            })
        .catch(err=>console.log(err))
    }

    const handleRegister = ()=>{
        register(userData).then(res=>res.json())
        .then(res=>{
            dispatch(loginUser({name:res.name,email:res.email}))
            dispatch(setCart(res.cart))
            finised()
        })
        .catch(err=>console.log(err))
    }

    


    return (
        <div>
            <header className='title-header-login'>
                <h1><span className='title-login'>Login or register</span></h1>
            </header>
                {isNewUser?
                <div className='new-user-box'>
                    <h3><span>
                        This User is not registerd yet!
                        <br/>
                        <br/>
                        Do you want to create a new user?
                        </span></h3>
                        <br/>
                        <p>name: {userData.name}</p>
                        <p>email: {userData.email}</p>
                        <br/>
                        <Button text={'Create'} handleClick={handleRegister}/>

                </div>:
                <form className='form-login-box' onSubmit={handleLogin}>
                    <label htmlFor='name'>name:
                        <input id='name' name='name' onChange={handleChange}/>
                    </label>
                    <label htmlFor='email'>email:
                        <input id='email' name='email' onChange={handleChange}/>
                    </label>
                    <Button  text={'SUBMIT'}/>
                </form>}
        </div>
    )

}
export default Login_Register