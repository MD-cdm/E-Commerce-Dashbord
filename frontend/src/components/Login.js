import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {

    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate=useNavigate();


    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
            {
                navigate('/')
            }
    },[])




    const handleLogin= async()=>{
        console.warn(email,password)
        let result = await fetch('https://e-commerce-dashboard-2-1q9n.onrender.com:8000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
              },

        })
        result = await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/")
        }else{
            alert("please enter the correct details")
        }
    }
    return (
        <div className='login'>
             <h1>Login</h1>
             {/* <input type='text' className='inputBox' placeholder='Enter Name'/> */}
             <input type='text' className='inputBox' placeholder='Enter Email'
             onChange={(e)=>setEmail(e.target.value)} value={email}/>
             <input type='text' className='inputBox' placeholder='Enter Password'
             onChange={(e)=>setPassword(e.target.value)} value={password}/>
             <button onClick={handleLogin}  className='appButton' type='button'>Login</button>
             
        </div>
    )
}

export default Login