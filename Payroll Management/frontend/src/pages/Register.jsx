import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import './Register.css'
import axios from 'axios'

const Form = () => {

const [userData,setuserData]=useState({username:"", email:"", password:"", phone:""});
const [error,seterror]=useState(false);
const [profilepic,setProfilepic] =useState("")

const handleInput = (e) => {
  const name=e.target.name;
  const value=e.target.value;
  setuserData({...userData, [name]:value});
}
const formreturn = async (e) => {

  e.preventDefault();

  seterror(false)
  const {username,email,password,phone} = userData;
 
   if(username && email && password && phone)
   { 
    try {
         
      //   console.log("ok");
      //  const res= await axios.post("http://localhost:3001/auth/register",{
      //   username,
      //   email,
      //   password,
      //   phone
      //  }).then(res=>console.log(res)).catch(err=>console.log(err))
      //  console.log(res)
      //  res.data && window.location.replace("/Login")

      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        };
        fetch('http://localhost:3001/auth/register', options)
        .then(data => {
            if (!data.ok) {
              throw Error(data.status);
             }
             return data.json();
            }).then(update => {
            console.log(update);
            }).catch(e => {
            console.log(e);
            });              
   }
    catch (err) {
     
      console.log(err)
    }    
   }
   else{
    alert("Invalid input");
   }
   
}

  return (
    <>
      
      <div className='formpage'>
      <div className='form'>
      <form action=""  >
        
        <div className='formcover'>
        <br/>    
        <h1>Register</h1>
        <br/>              
        <label htmlFor='username'>Fullname</label>
        <input type='text' name="username" value={userData.username} onChange={handleInput} id="username"/>        
        <label htmlFor='email'>email</label>
        <input type='text' name="email" value={userData.email} onChange={handleInput} id="email"/>        
        <label htmlFor='password'>password</label>
        <input type='text' name="password" value={userData.password} onChange={handleInput} id="password"/>        
        <label htmlFor='phone'>phone</label>
        <input type='text' name="phone" value={userData.phone} onChange={handleInput} id="phone"/>
        <button className='buttonsubmit' type='submit' onClick={formreturn} name='submit'>SUBMIT</button>
        <button type='button' className='loginbtn'><Link to={"/Login"} className='link'>LOGIN </Link></button>
        {error && <span className='error'>username or email already in use</span> }
        </div> 
              
      </form>
      </div>
      </div>
    </>
  )
}

export default Form;
