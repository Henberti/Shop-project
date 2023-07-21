import Bilboard from '../components/Bilboard'
import StoreGrid from '../components/StoreGrid'
import './style/main_page.css'


const MainPage = ()=>{
    

    return (
       <div className='main-style-page'>
        <div className='head-main-page'>
        <div className="line"></div>
            <Bilboard />

        </div>
     
        <StoreGrid />

       </div>
    )

}
export default MainPage