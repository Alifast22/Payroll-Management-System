import React, {createContext, useContext, useEffect, useState} from 'react'

import { BrowserRouter,Router,Link, } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import Register from './Register'
import EmployeeDashboard from './EmployeeDashboard';
import Employee_Set from './Employee_Set.js';
import './Login.css'
import axios from 'axios'

// export const Usename=createContext();

const Login = () => {
  const [username,setUsername]=useState(JSON.parse(localStorage.getItem('username')));
  const [empid,setEmpid]=useState(JSON.parse(localStorage.getItem('id')))
  const [attid,setAttid]=useState(JSON.parse(localStorage.getItem('attid')))
    const [password,setPassword]=useState("");
    const [err,setErr]=useState(false);
    let {cred,setCred,credid,setCredid}=useContext(Employee_Set)
   let navigate=useNavigate();
    const handleInput =async (e) => {
 
      
      setCred(username)
      console.log("from emp",cred)
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
                if (!data.ok) {
                  throw Error(data.status);
                 }
                 console.log("received data")
                 return data.json();
                }).then(async update => {
                  if(update.err===null)
                  {
                      setErr(true);
                      throw Error(update.err);
                  }
                  else{
                    setCredid(update[0].idEmployee)
                    setEmpid(update[0].idEmployee)
                    console.log(update[0].idEmployee)
                    const newAttendance ={
                      date: new Date().toLocaleDateString(),
                      enter_time: new Date().toLocaleTimeString(),
                      exit_time:null,
                      present:'P',
                      id:update[0].idEmployee
                  };
                    const res=await axios.post("http://localhost:3001/att/insert",newAttendance);
                 
                    const attid=res.data.insertId
                    console.log(res.data)
                    
                    if (newAttendance.enter_time>'07:00:00 AM'){
                      
                      const empres= await axios.get(`http://localhost:3001/emp/${newAttendance.id}`)
                      const pay=empres.data[0].hourly_pay
              
                      const newDeduction={
                        deduc_amount:pay*0.1,
                        id:attid
                      }
                      const res1=await axios.post("http://localhost:3001/payments/insert",newDeduction);
                    }
                   
                    console.log("idatt",res.data.insertId);
                    setAttid(res.data.insertId);
                    navigate("/EmployeeDashboard")
                    localStorage.setItem('attid',JSON.stringify(res.data.insertId)) 
                    //navigate("/EmployeeDashboard")
                    // return(<Link to={"/EmployeeDashboard"}><EmployeeDashboard username={username}/></Link>)   
                // return(
                // <Usename.Provider value={"Hi from login"}>
                //  <EmployeeDashboard/>
                //  </Usename.Provider>
                //  )
                  }   
                  
                }).catch(e => {
                console.log(e);
                });         

      } catch (err) {

        alert("Invalid credentials")
      }
      
    }

    useEffect(()=>{
      localStorage.setItem('username',JSON.stringify(username))
      console.log(username)
    },[username])     
    useEffect(()=>{
      localStorage.setItem('id',JSON.stringify(empid))
      console.log(empid)
    },[empid])

    useEffect(()=>{
      localStorage.setItem('attid',JSON.stringify(attid))
      console.log(attid)
    },[attid])  
        
    const [ctime,setCtime]=useState(time);
    let time;
    const UpdateTime = () => {
       time=new Date().toLocaleTimeString();
       setCtime(time);
    }

    setInterval(UpdateTime,1000)
  return (
    
    <>

      <div className='formpage'>
        
      <div className='form'>
      <form action=""  onSubmit={handleInput} >
        
        <div className='formcover'>
        <br/>    
        <h1>Employee Login</h1>
        <br/>   
        <div style={{color:'white'}}>
           <h2 style={{textAlign:'center',fontFamily:'sans-serif'}}>Time: {ctime}
           {!ctime && 'fetching...'}
           </h2>
        </div>
        <label htmlFor='username'>username</label>
        <input type='text' name="username"  id="username" onChange={(e)=>{setUsername(e.target.value)}}/>        
        <label htmlFor='password'>password</label>
        <input type='text' name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>        
        {err && <span style={{alignSelf:"center",color:'red'}}>Wrong Credentials</span>}
        <button className='buttonsubmit' type='submit' name='submit' style={{marginTop:'20px'}}>Submit</button>     
        </div> 
              
      </form>
      </div>
      </div>      
    </>
  )
}

export default Login;
