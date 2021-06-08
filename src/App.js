import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Header/Header';
import Home from './Home/Home';
import Checkout from './Checkout/Checkout';
import Login from './Login/Login';
import { auth } from './Firebase/firebase';
import { useStateValue } from './StateProvider/StateProvider';
import { SET_USER } from './Constants/Constants';
import Payment from './Payment/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './OrdersPage/Orders';

const promise = loadStripe('pk_test_51InjqFSDSuq4vy756i7lonS0oCeMvWamNA8IoQ56WkXTpyxdGNBhafcmSOD0cymX4DXW6FElMB5S1XrWWLWyRcnd00poZdaD8K')


function App() {

  const [{ }, dispatch] = useStateValue()

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      //console.log('the user is >>>', authUser)

      if (authUser) {
        //the user just logged in/the user was logged in
        dispatch({
          type: SET_USER,
          user: authUser
        })
      }
      else {
        //the user is logged out
        dispatch({
          type: SET_USER,
          user: null
        })
      }
    })

  }, [])

  return (
    <Router>
      <div className="app">

        <Switch>

          <Route path='/orders'>
            <Header></Header>
            <Orders></Orders>
          </Route>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <Route path='/checkout'>
            <Header></Header>
            <Checkout></Checkout>
          </Route>

          <Route path='/payment'>
            <Header></Header>
            <Elements stripe={promise}>
              <Payment></Payment>
            </Elements>
          </Route>

          <Route path='/'>
            <Header></Header>
            <Home></Home>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
