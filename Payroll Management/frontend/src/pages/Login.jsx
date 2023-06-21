import React, {useContext, useRef, useState} from 'react'
import { BrowserRouter,Router,Link } from 'react-router-dom';
import Register from './Register'
import Home from './Home'
import './Login.css'
const axios= require('axios')

const Login = () => {

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [err,setErr]=useState(false);



    const handleInput =async (e) => {

      e.preventDefault();



      try {

        // console.log('OK');
        // const res=await axios.post("http://localhost:3001/auth/login",{         
        //   username: username,
        //   password: password
        // });
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,password}),
            };
            fetch('http://localhost:3001/auth/login', options)
            .then(data => {
                if (!data) {
                  throw Error(data.status);
                 }
                else{ 
                 console.log("received data")
                 console.log("data");
        
                 return data.json();

                }

                }).then(update => {
                console.log(update);
                if(update.err===null)
                {
                    setErr(true);
                    throw Error(update.err);
                }
                else{
                window.location.replace("/Home")
                }
                }).catch(e => {
                console.log(e);
                });         

        

      } catch (err) {

        alert("Invalid credentials")
      }
      
    }

  return (
    
    <>
      <div className='formpage'>
        
      <div className='form'>
      <form action=""  onSubmit={handleInput} >
        
        <div className='formcover'>
        <br/>    
        <h1>Login</h1>
        <br/>   

        <label htmlFor='username'>username</label>
        <input type='text' name="username"  id="username" onChange={(e)=>{setUsername(e.target.value)}}/>        
        <label htmlFor='password'>password</label>
        <input type='text' name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>        
        {err && <h4>Wrong Credentials</h4>}
        <button className='buttonsubmit' type='submit' name='submit'>SUBMIT</button>
        <button type='button' className='regiterbtn'><Link to={"/Register"} className={"linkclass"}>Register</Link></button>
        
        
        </div> 
              
      </form>
      </div>
      </div>      
    </>
  )
}

export default Login;
