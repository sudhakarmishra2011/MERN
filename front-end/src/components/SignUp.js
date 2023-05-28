import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = () =>{
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const navigate = useNavigate();

    useEffect(()=>{
      const auth = localStorage.getItem('user')
      if(auth){
        navigate("/")
      }
    })
    
    const collectData = async () => {
      console.log(name,email,password) 
      
      let result = await fetch('http://localhost:5000/register',{
        method:'post',
        body: JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        }
      })

      result = await result.json()

      localStorage.setItem("user",JSON.stringify(result))
      
      if(result){
        navigate("/")
      }
    }
    
    return (
        <div className="register">
            <h1>Register</h1>
            <input value={name} onChange={(e)=> setName(e.target.value)} className="inputBox" type="text" placeholder="Enter Name" />
            <input value={email} onChange={(e)=> setEmail(e.target.value)} className="inputBox" type="text" placeholder="Enter Email" />
            <input values={password} onChange={(e)=> setPassword(e.target.value)} className="inputBox" type="password" placeholder="Password" />
            <button onClick={collectData} className="appButton">Sign Up</button>
        </div>
    )
}

export default SignUp;