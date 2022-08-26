import React,{useState,useContext} from 'react'
import { Link,useNavigate  } from "react-router-dom";
import M from "materialize-css";
import {UserContext} from '../../App'

const Signin = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useNavigate()

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const PostData=()=>{
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid email",classes:"#d50000 red accent-4"})
      return
  }

    fetch("/signin",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          password,
          email
      })
  
  }).then(res=>res.json())
  .then(data=>{
   if(data.error){
    M.toast({html: data.error,classes:"#e53935 red darken-1"})
   }
   else{
    localStorage.setItem("jwttoken",data.token)
    localStorage.setItem("user",JSON.stringify(data.user))
    dispatch({type:"USER",payload:data.user})
    M.toast({html: "Signedin successfully",classes:"#00bfa5 teal accent-4"})
    history("/");
   }
}).catch(err=>{
  console.log(err)
})

    
}

  return(
<div className="mycard">
      <div className="card  auth-card input-field">
        <h2>Mern App</h2>
        <input type="text" placeholder="email" value={email}
          onChange={(e) => setemail(e.target.value)}/>
        <input type="password" placeholder="password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
        <button className="btn waves-effect waves-light #448aff blue accent-2"  onClick={()=>PostData()}>
          Signin
        </button>
        <h5>
          <Link to="/signup">New User?</Link>
        </h5>
      </div>
    </div>
  )
}

export default Signin