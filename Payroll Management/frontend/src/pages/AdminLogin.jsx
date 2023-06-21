import { Button } from '@mui/material';
import React from 'react'
import {useState} from 'react'

import {Link} from 'react-router-dom'
import styled from 'styled-components';

const Cont=styled.div`
    display:flex ;
`
const ImgCont=styled.div`
    border: 1pt solid;
    flex: 2;
    height: 100vh;
    
`
const Image=styled.img`
  width: 100%;
  height: 100vh;
  object-fit: fill;
`
const TextCon=styled.div`
    flex:1;
    display: flex;
    justify-content: center;
`
const Curve=styled.div`
    display: flex;
    flex-direction: column;
    border: 1pt solid;
    height: 100vh;
   margin-top: 40px;
   margin-bottom: 30px;
   width: 80%;
   height: 80vh;
   border-radius: 20px;
   background-color: #eed3a073;
   padding-top: 60px;
`
const FormText=styled.div`
   display: flex;
   flex-direction: column;
`
const FormIn=styled.input`
    
    border: 1pt solid teal;
     background-color: white;
`
const FormLab=styled.label`
    color: black;
`
const AdminLogin = () => {

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
              fetch('http://localhost:3001/auth/loginadmin', options)
              .then(data => {
                  if (!data.ok) {
                    throw Error(data.status);
                   }
                   console.log("received data")
                   return data.json();
                  }).then(update => {
                    if(update.err===null)
                    {
                        setErr(true);
                        throw Error(update.err);
                    }
                    else{
                    window.location.replace("/Home")
                    localStorage.setItem("admin",username)
                    }                   
                  }).catch(e => {
                  console.log(e);
                  });         


      //
           
  
        } catch (err) {
  
          alert("Invalid credentials")
        }
        
      }
  

  return (
    <Cont>
     <ImgCont>
     <Image src='https://media.istockphoto.com/id/513954989/photo/the-same-repeated-every-day-on-the-desk.jpg?s=612x612&w=0&k=20&c=arYAclJ7jZXs9uNVAZn4otYxwuB_vzGwHhBi52Odnnk='/>
     </ImgCont>
     <TextCon >
        <Curve>
      <form action=""  onSubmit={handleInput} >
        
        
           <br/>    
        <h1 style={{color:'black'}}>Login</h1>
        <div>
        <FormText>
        <FormLab htmlFor='username'>username</FormLab>
        <FormIn type='text' name="username"  id="username" onChange={(e)=>{setUsername(e.target.value)}}/>        
        <FormLab htmlFor='password'>password</FormLab>
        <FormIn type='text' name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>        
        {err && <span style={{alignSelf:"center",color:'red'}}>Wrong Credentials</span>}
        <Button variant='outlined' className='buttonsubmit' type='submit' name='submit' style={{marginTop:'40px',color:'teal',border :'1pt solid teal'}}>SUBMIT</Button>
        </FormText>
        </div>     
      </form> 
      </Curve> 
      </TextCon>    
    </Cont>
  )
}

export default AdminLogin
