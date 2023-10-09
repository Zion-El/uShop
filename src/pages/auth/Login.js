import React, { useState } from 'react'
import styles from './auth.module.scss'
import LoginImg from "../../Assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from "../../firebase/config"
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate()

    const handleLogin = (e) =>{

        e.preventDefault()
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            setIsLoading(false)
            toast.success("login Successfull")
            navigate("/")

            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            setIsLoading(false)
            toast.error(errorMessage);

        });
    }

    const handleGoogleLogin = () =>{

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            toast.success("Login Successful")
            navigate("/")
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {

            const errorMessage = error.message;
      
            // ...
            toast.success(errorMessage)
        });
    }

  return (
    <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={LoginImg} alt='login' width="400px"/>
            </div>
            <Card>
            <div className={styles.form}>
                <h2>Login</h2>

                    <form onSubmit={handleLogin}>
                        <input type='email' placeholder='Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <input type='password' placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>

                        <button className='--btn --btn-primary --btn-block'>Login</button>
                        <div className={styles.links}>
                            <Link to="/reset">Reset Password</Link>
                        </div>

                        <p>-- or --</p>
                        <button onClick={handleGoogleLogin} className='--btn --btn-danger --btn-block'><FaGoogle color='#fff'/> Login With Google</button>
                        <span className={styles.register}>
                            <p>Don't have an account?</p>
                            <Link to="/register">Register</Link>
                        </span>
                    </form>
                

            </div>
            </Card>
        </section>    
    </>

  )
}

export default Login
