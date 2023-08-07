import Header from './components/Header'
import MainPage from './pages/mainPage'
import Notification from './components/Notification'
//Hen Berti 201381407 && Eliran Belaish 207598467

/*
in this implementation I used
3 main components
1. header: this component manage the user login or register and the cart
    inside the header component you can see the cart component
2. notification:
    this component manage the notification over the app
3. mainPage handle all the rest of the store


note that I used redux-store to manage data over all app
specially between siblings components.
* */



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
