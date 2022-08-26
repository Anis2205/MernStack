import React,{useState,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../App'

const Navbar = () => {
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  const logout = ()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history('/signin')
  }
  const renderlist = ()=>{
  if(localStorage.getItem('jwttoken')){
   return [
    <li><Link to="/Profile">Profile</Link></li>,
    <li><Link to="/create">Create Post</Link></li>,
    <li>    <button className="btn waves-effect waves-light #e53935 red darken-1"  onClick={()=>logout()}>
   Logout
  </button></li>
   ]
    }
    else{
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
       ]  
    }
  }
  return(

      <nav>       
      <div className="nav-wrapper white"  >       
      <Link to={state?"/":"/signin"} className="brand-logo left"> Mern App</Link>
      <ul id="nav-mobile" className="right ">
    {renderlist()}

      </ul>
    </div>
  </nav>

  )
}

export default Navbar