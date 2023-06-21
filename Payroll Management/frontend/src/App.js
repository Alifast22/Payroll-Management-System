import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Attendance from './pages/Attendance';
import Project from './pages/Project';
import Register from './pages/Register';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import Login_toggle from './pages/Login_toggle';
import AdminLogin from './pages/AdminLogin';
import EmployeeLogin from './pages/EmployeeLogin';
import Deductions from './pages/Deductions';
import Apitest from './pages/apitest';
import Employee_Set from './pages/Employee_Set.js';
const flag="hewllo";
function App() {
  const [cred,setCred]=useState("");
  const [credid,setCredid]=useState("");
  const [user,setUser]=useState(localStorage.getItem("username"))
  console.log("user",user);
  console.log("from app",cred)
  // const [socket,setSocket]=useState();

  // useEffect (()=>{
  //   setSocket(io("http://localhost:4000"));
  //  // console.log(socket);
  //   let onlineuser =[];
        
  //   // console.log("someone has connected");
  //   // socket.on("Project",(msg)=>{
  //   //   console.log(msg)
  //   // })
  // },[])
 
 // console.log(socket)
  
  return (
    <Employee_Set.Provider value={{cred,setCred,credid,setCredid}}>
    <BrowserRouter>
      
   <Routes>
    {/* {console.log(socket)} */}
   <Route exact path='/' element={<Login_toggle/> }/>
   <Route exact path='/AdminLogin' element={<AdminLogin/> }/>
   <Route exact path='/Register' element={<Register/> }/>
   <Route path='/Login' element={<Login/>}/>
   <Route path='/EmployeeLogin' element={<EmployeeLogin/>}/>
   <Route path='/EmployeeDashboard' element={user ? <EmployeeDashboard/> : <EmployeeLogin/>}/>
   <Route path='/Home' element={<Home/>}/>
   <Route path='/Project' element={<Project admin={true}/>}/>
   <Route path='/Attendance' element={<Attendance/>}/>
   <Route path='/apitest' element={<Apitest/>}/>
   <Route path='/Deductions' element={<Deductions/>}/>

   </Routes>      
      </BrowserRouter>
   </Employee_Set.Provider>
  

  );
}

export default App;
