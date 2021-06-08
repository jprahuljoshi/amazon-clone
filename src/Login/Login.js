import React from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../Firebase/firebase'

const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()

        //Firebase login

        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault()

        //Firebase register

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                // console.log(auth)

                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }


    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png' alt='amazon'></img>
            </Link>

            <div className='login__container'>
                <h1>Sign-In</h1>

                <form>
                    <h5>Email</h5>
                    <input type='email' value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                    <h5>Password</h5>
                    <input type='password' value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>

                    <button className='login__signInButton'
                        type='submit'
                        onClick={signIn}>Sign-In</button>

                    <small className='login__checkbox'>
                        <input type='checkbox'></input>
                        Keep me signed in.
                    </small>
                </form>
                <p>
                    By continuing, you agree to <strong>AMAZON'S FAKE CLONE</strong> Conditions of Use and Privacy Notice.
                </p>
                <small>New to Amazon-Clone?</small>
                <button className='login__register'
                    onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
