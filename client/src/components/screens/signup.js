import React, { useState} from "react";
import { Link,useNavigate  } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useNavigate()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")



  const PostData=()=>{
    if(!/^[a-zA-Z ]+$/.test(name)){
      M.toast({html: "Invalid name",classes:"#d50000 red accent-4"})
      return
    }
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid email",classes:"#d50000 red accent-4"})
      return
  }

    fetch("/signup",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          name,
          password,
          email
      })
  
  }).then(res=>res.json())
  .then(data=>{
   if(data.error){
    M.toast({html: data.error,classes:"#e53935 red darken-1"})
   }
   else{
    M.toast({html: data.message,classes:"#00bfa5 teal accent-4"})
    history("/signin");
   }
}).catch(err=>{
  console.log(err)
})

    
}



  return (
    <div className="mycard">
      <div className="card  auth-card input-field">
        <h2>Mern App</h2>
        <input type="text" placeholder="email" value={email}
          onChange={(e) => setemail(e.target.value)} />
        <input type="text" placeholder="name" value={name} onChange={(e) => setname(e.target.value)} />
        <input type="password" placeholder="password" value={password}
          onChange={(e) => setpassword(e.target.value)} />
        <button className="btn waves-effect waves-light #448aff blue accent-2"  onClick={()=>PostData()}>
          Signup
        </button>
        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
