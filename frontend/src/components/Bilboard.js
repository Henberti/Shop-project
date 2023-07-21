import './styles/bilboardStyle.css'
import {useState, useRef, useEffect} from 'react'
import { ImagesArray as images } from '../assets/imagesArray'



const BilBoard = ()=>{
    const maxSize = images.length-1;
    const [index,setIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(0)

    const canSlide = useRef(true)

    useEffect(() => {
    
        const intervalId = setInterval(() => {
            if(canSlide)
                setIndex(prev=>(prev+1)%maxSize)
        }, 8000);
    

        return () => clearInterval(intervalId);
    }, []); 




    const handleChange = (diraction)=>{
        if(!canSlide.current)return
        canSlide.current = false;
        
        let currentIndex = index
        if(diraction==='left')
            --currentIndex
        else
            ++currentIndex
        
        if(currentIndex >= maxSize )
            currentIndex = 0;
        if(currentIndex <0)
            currentIndex = maxSize

        
            
        const frame =document.querySelector('#img-frame')
        frame.className = 'img-bilboard'
        setTimeout(()=>{
            frame.className = ''
            canSlide.current = true

        },1000)
        
        setPrevIndex(()=>index)
        setIndex(()=>currentIndex)
        
    }




    return (
        <div className='bilboard-box-main'>
            <div className='main-description'>
                <div style={{width:'60%',height:'100%', paddingLeft:'10px'}}>
                <p className='paragraph'>Welcome to Moto Matrix, your ultimate destination for all motorcycle parts and accessories. We're passionate about all things two-wheeled and understand the importance of providing top-notch parts for your ride. Whether you're a casual commuter, a seasoned road-tripper, or a racing enthusiast, we've got the gear to keep you on the road. Our extensive selection ranges from basic essentials to high-end accessories, all designed to enhance your riding experience and meet your motorcycle's specific needs. We are dedicated to providing high-quality products, exceptional service, and expert advice. Moto Matrix isn't just a store - it's a community for those who live and breathe the thrill of the ride. Join us and revamp your ride today! </p>
                </div>
            </div>
            <div className='bilboard-box-left'>
                <img id='img-frame' src={images[index]} alt='image'/>
                <img className='prev-img' src={images[prevIndex]} alt='prev image' />
                
                <div className='bilboard-slider'>
                    <button onClick={()=>handleChange('left')}>{'<<'}</button>
                    <p>moto matrix</p>
                    <button onClick={handleChange}>{'>>'}</button>
                </div>

            </div>
        </div>
    )


}

export default BilBoard