import React,{useEffect} from 'react'
import './App.css';
import Header from './Header/Header.jsx'
import Homepage from './Homepage/Homepage'
import {Route, Switch, Redirect} from 'react-router-dom'
import {auth,createUserProfileDocument} from './firebase/firebase.utilites.js'
import {setCurrentUser} from './Redux/UserReducer/UserAction'
import {connect} from 'react-redux'
import Userspage from './Userspage/Userspage'
import Loginpage from './Loginpage/Loginpage'
import Signuppage from './Signuppage/Signuppage'
import Adduser from './Adduser/Adduser'
import Edituser from './Edituser/Edituser'
import {Toolbar} from '@material-ui/core'


function App({currentUser,setCurrentUser}) {


  useEffect(()=>{

    auth.onAuthStateChanged( async userAuth=>{

      if(userAuth)
      {
          const UserRef = await createUserProfileDocument(userAuth);
          if(UserRef){
          UserRef.get().then(snapShot => 
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          )
      }
    }
      else
      {
        setCurrentUser(userAuth);
      }
    })

  },[setCurrentUser])

  return (
    <div>
      <Header />
      <Toolbar/>
      <Switch>
        <Route  exact path='/' component={Homepage} />
        <Route  exact path='/home' component={Homepage} />
        <Route  exact path='/users'>
            {currentUser ? <Userspage/> : <Redirect to='/login' />}
        </Route>
        <Route  exact path='/login' component={Loginpage} />
        <Route  exact path='/signup' component={Signuppage} />
        <Route  exact path='/adduser'>
            {currentUser ? <Adduser/> : <Redirect to='/login' />}
        </Route>
        <Route  exact path='/edituser'>
            {currentUser ? <Edituser/> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch =>({

  setCurrentUser : user => dispatch(setCurrentUser(user))

})

const mapsStateToProps= state =>({
  currentUser: state.user.currentUser
})

export default connect(mapsStateToProps,mapDispatchToProps)(App);
