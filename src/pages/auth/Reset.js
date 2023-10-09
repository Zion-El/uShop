import React, { useState } from 'react'
import styles from './auth.module.scss'
import ResetImg from "../../Assets/forgot.png"
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import {auth} from "../../firebase/config"
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

const Reset = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleReset = (e) =>{
        e.preventDefault()

        // const user = auth.currentUser;
        setIsLoading((true))
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            setIsLoading((true))
            sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                toast.success("A reset password email has been sent to you")
            })
            .catch((error) => {
                const errorMessage = error.message;
                // ..
                setIsLoading((false))
                toast.error(errorMessage)
    
            });    
            toast.success("A reset password email has been sent to you")

        })
        .catch((error) => {
            const errorMessage = error.message;
            // ..
            setIsLoading((false))
            toast.error(errorMessage)

        });    
    }



  return (
    <>
        {isLoading  && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={ResetImg} alt='Register' width="400px"/>
            </div>
            <Card>
            <div className={styles.form}>
                <h2>Reset Password</h2>

                    <form onSubmit={handleReset}>
                        <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
                        <div className={styles.links}>
                            <p>
                                <Link to="/login">- Login</Link>                        
                            </p>
                            <p>
                                <Link to="/register">Register -</Link>                        
                            </p>

                        </div>
                    </form>
                

            </div>
            </Card>



    </section>
    </>

  )
}

export default Reset
