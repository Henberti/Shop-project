import Header from './components/Header'
import MainPage from './pages/mainPage'
import Notification from './components/Notification'



const App = ()=>{
  return (
    <div style={{}}>
      <div>
        <Header />
      </div>
      <div style={{paddingTop:'150px'}}>
        <Notification/>
        <MainPage />
      </div>
     
    
    </div>
  )
}

export default App;
