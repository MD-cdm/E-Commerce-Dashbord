import { stringify } from 'ajv';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
            {
                navigate('/')
            }
    },[])


    const collectData= async () => {
        console.log(name,email,password)
        let result = await fetch('https://e-commerce-dashboard-2-1q9n.onrender.com:8000/register',{
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          },
        })
        result = await result.json();
        // console.warn( result);
        localStorage.setItem("user",stringify(result.result));
        localStorage.setItem("token",stringify(result.auth));
        if(result)
          {
            navigate('/')
          }
    }



  return (
    <div className='register'>
        <h1>Register Here!</h1>
        <input className='inputBox'
          type='text' value={name} onChange={(e)=>setName(e.target.value)} 
         placeholder='Enter Name'/>


        <input className='inputBox' 
        type='text' value={email} onChange={(e)=>setEmail(e.target.value)}
         placeholder='Enter Email'/>


        <input className='inputBox' 
          type='text'value={password} onChange={(e)=>setPassword(e.target.value)}
        placeholder='Enter Password'/>

        
        <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
    </div>
  )
}

export default Signup;








































