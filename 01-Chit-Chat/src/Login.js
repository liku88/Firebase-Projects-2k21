import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebaseConfig'
import './Login.css'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'


const Login = () => {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
     auth.signInWithPopup(provider).then(result => {
         dispatch({
             type:actionTypes.SET_USER,
             user:result.user
         })
     }
     ).catch(error => alert(error.message));
    }
    return (
        <div className="login">
        <div className="login-container">
        <img className="imgg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaj2SAJY5bFwrXCS8zMveQtr1u-82nqv4fA&usqp=CAU" alt=""/>
        <div className="login-text">
        <h1>Log in To App</h1>
        </div>
        <Button  onClick={signIn}>
        Google Login
        </Button>
        </div>
        </div>
    )
}

export default Login