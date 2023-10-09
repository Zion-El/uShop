import React, {useState} from 'react'
import styles from './auth.module.scss'
import RegisterImg from "../../Assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../../firebase/config"
import Loader from '../../components/loader/Loader'


const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [c_password,setCPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = (e) =>{
        e.preventDefault()

        if (password !==  c_password){
            toast.error("Passwords do not match")
        }
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            setIsLoading(false)
            toast.success(`Registration Successful`)
            navigate('/login')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setIsLoading(false)
            toast.error(errorCode, errorMessage)
            // ..
        });
    }

  return (
    <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>

            <Card>
            <div className={styles.form}>
                <h2>Register</h2>

                    <form onSubmit={handleRegister}>
                        <input type='email' placeholder='Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <input type='password' placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <input type='password' placeholder='Confirm Password' required value={c_password} onChange={(e)=> setCPassword(e.target.value)}/>

                        <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </form>
                

            </div>
            </Card>
            <div className={styles.img}>
                <img src={RegisterImg} alt='Register' width="400px"/>
            </div>


        </section>
    </>

  )
}

export default Register
