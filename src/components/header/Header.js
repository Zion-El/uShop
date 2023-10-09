import React, { useEffect, useState } from "react";
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa"
import {HiOutlineMenuAlt3} from "react-icons/hi"
import { signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase/config"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// importing the action to be dispatched
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/hiddenLinks";


export const Logo = () =>(
  <div className={styles.logo}>
    <Link to='/'>
      <h2>u<span>Shop</span>.</h2>
    </Link>
  </div>
)

const Cart = (
      <span className={styles.cart}>
          <Link to={'/cart'}>Cart  <FaShoppingCart size={20}/>
         <p>0</p></Link>
      </span>
)

const activeLink = ({isActive})=> (isActive ? `${styles.active}` : "") 


const Header = () => {

  const [showMenu, setShowMenu] = useState(false)
  const [u_name, setU_Name] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = auth.currentUser

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName ===null){
          // const u1 = (user.email.split("@"))[0]
          // extracts the characters before the @ in the email
          const u1 = user.email.substring(0, user.email.indexOf("@"))
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setU_Name(uName)

          dispatch(SET_ACTIVE_USER({
            email: user.email,
            username: uName,
            user_id: user.uid,
          }))
        }else{
          setU_Name(user.displayName)

          dispatch(SET_ACTIVE_USER({
            email: user.email,
            username: user.displayName,
            user_id: user.uid,
          }))
        }

        // ...
      } else {
        // User is signed out
        // ...
        setU_Name("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch])
  

  // console.log(user)

  const toggleMenu = () =>{
    setShowMenu(!showMenu)
  }
  const hideMenu = () =>{
    setShowMenu(false)
  }

  const handleLogout = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Logged out Successfully")
      navigate("/login")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message)
    });
  }





  return (
    <header>
      <div className={styles.header}>
        <Logo/>
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}` }
          onClick={hideMenu}></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                <Logo/>
                <FaTimes onClick={hideMenu} size={22} color="#fff"/>
              </li>
              <li><NavLink to='/' className={activeLink}>Home</NavLink></li>
              <li><NavLink to='/contact' className={activeLink}>Contact Us</NavLink></li>
            </ul>

            <div onClick={hideMenu} className={styles["header-right"]}>
              <span className={styles.links}>
                <ShowOnLogin>
                  <a href="#home" style={{color:"#ff7722"}}> <FaUserCircle size={16}/> Hi, {u_name}</a> 
                  
                  <Link className={activeLink} to="/order-history">My Orders</Link>
                  <Link onClick={handleLogout} to="login">Logout</Link>
                </ShowOnLogin>
                <ShowOnLogout>
                  <Link className={activeLink} to="/login">Login</Link>
                  <Link className={activeLink} to="/register">Register</Link>                  
                </ShowOnLogout>

                {/* <ShowOnLogin>
                  {user? <a href="#home"> <FaUserCircle size={16}/> Hi, {u_name}</a> : <Link className={activeLink} to="/login">Login</Link>}
                  <Link className={activeLink} to="/order-history">My Orders</Link>
                  {user? <Link onClick={handleLogout} to="login">Logout</Link> : ""}
                </ShowOnLogin>
                
                {user? "" : <Link className={activeLink} to="/register">Register</Link>} */}
                
                
              </span>
              {Cart}
            </div>            
        </nav>

        <div className={styles["menu-icon"]}>
          {Cart}
          <HiOutlineMenuAlt3 onClick={toggleMenu} size={28}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
