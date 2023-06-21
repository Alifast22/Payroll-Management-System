import React, { useEffect, useState,useContext } from 'react';

import styled from 'styled-components';
import Graph from '../components/Graph'
import Project from './Project';
import Card from '../components/oldCard';
import { io} from "socket.io-client";
import {Link, Navigate} from 'react-router-dom';
import Attendance from './Attendance';
import { Button } from 'react-bootstrap';
import axios from 'axios'
import Usename from './EmployeeLogin'
import Deductions from './Deductions';
import Employee_Set from './Employee_Set';

const Navbar=styled.div`
  background-color: #6298ad;
  display: flex;
  justify-content: space-around;
  color: white;
  height: 10vh;
  text-align: end;
  position: relative;
`
const Title= styled.span`
    flex: 1;
    display: flex;
    align-self: flex-start;
    margin-left: 20px;
    margin-right: 40px;
    margin-top: 15px;
    font-size: 24px;
`
const Titlecont=styled.div`
    display: flex;
    align-items: center;
    text-align: center;

`
const Profile=styled.div`
   flex: 1;
   
   margin-right: 30px;
   display: flex;
   justify-content: end;
   align-items: center ;
`
const ProfileName= styled.span`
   font-weight:300;
   margin-left: 10px;
   
`
const Circle=styled.img`
    border-radius: 50px;
    width: 50px;
    height: 50px;
    object-fit: cover;
`
const Circle2=styled.img`
    height: 10vh;
    width: 10vh;
    border-radius: 10px;
    object-fit: cover;
`
const Circlesmall=styled.div`
    height: 7px;
    width: 7px;
    border-radius: 50px;
    background-color: #3bd33b;
    margin-right: 10px;
`
const Onlinecont=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Page=styled.div`
    display: flex;
`
const Sidebar=styled.div`
    flex: 1;
    width: 100%;
    height: 100vh;
    background-color: #272727;
    display: flex;
    flex-direction: column;
`
const TextCon=styled.div`
     background-color: #4c4c63;
     height: auto;
     padding:10px;
     text-align: center;
`
const Text=styled.a`
    color: #a09595;
    text-decoration: none;
`
const HeadText=styled.a`
    color: #a09595;
    text-decoration: none;
    font-size: 14px;
`
const Headcon=styled.div`
    background-color: #272727;
    height: 40px;
    padding: 10px;
    text-align: center;
`
const Main=styled.div`
    flex: 5;
    background-color: #d4dee9;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Icondiv=styled.div`
    display: flex;
    position: relative;
`
const IconCircle=styled.div`
    border-radius: 50px;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    right:1.5rem;
    top: 2px;
    text-align: center;
`
var arr=[];
let soc;
let socket;

const getLocid = ()=>{
    const data=localStorage.getItem("id")
    console.log(data)
    if(data)
    {
        return JSON.parse(localStorage.getItem('id'))
    }
}
const getLocProj = ()=>{
    const data=localStorage.getItem("projlist")
    console.log("data",data)
    if(data)
    {
        return JSON.parse(localStorage.getItem('projlist'))
    }
}


const Home = () => {
    let res   
    const idEmployee=7


    const [value,setValue]=useState(false);
    const [open,setOpen]=useState(false);
    const [option,setOption]=useState([]);
    const [notification,setNotification]=useState([]);

    const [display,Setdisplay]=useState({dashboard:true,attendance:false,deduction:false})
    
    const {cred,setCred,credid}=useContext(Employee_Set)
    
    console.log(credid)
   
    // useEffect(()=>{
    //     socket = io("http://localhost:4000")
        
    //     socket.off('receiveNotification').on('receiveNotification',(var1,var2)=>{
    //        console.log(var1,var2)
    //       setNotification(()=>[{var1,var2}])
    //       if(var1){
    //            if(arr==null)
    //            {
    //             localStorage.setItem('projlist',JSON.stringify(var1,var2))
    //             arr[0]={var1:var1,var2:var2}
    //            }
    //              arr.push({var1:var1,var2:var2})   
                
    //             }
    //         return()=>{
    //             socket.off('receiveNotification',(var1,var2))
    //         }
    //     })
    // },[])
    
useEffect(async()=>{
    try {
           
        res= await axios.get("http://localhost:3001/projects/notpickedget");
        console.log("Posted")
        console.log("getpicked",res.data);
       let i=0;
        res.data &&
        res.data.map((e)=>{
         arr[i]=e
         i++
         option.push(e)
        })

        setOpen(true)
       
          
        
        
    } catch (err) {
        console.log(err);
    }

},[])
  

     

    // useEffect(()=>{
    //     if(socket){console.log(socket.id)
    //      arr.push({var1:notification.var1,var2:notification.var2})   
    //     }
    // },[notification])

    
    console.log(getLocid());
    const handleProject =async (notification)=>{
       
        console.log("enter",notification,idEmployee)
        try {
        console.log("check",notification.var2)
        
          const res=await axios.put(`http://localhost:3001/projects/picked/${notification.idprojects}`,{idEmployee:getLocid()});
          console.log("Posted")
          console.log("id",res);
          RemoveArr(notification)
      } catch (err) {
          console.log(err);
      }
      
        }  
     const RemoveArr = (notification)=>{
       const ind=arr.indexOf(notification.var2)
       arr.splice(ind,1)
       setOpen(false);
     }     

    const displayNotification = (notification) => {
        console.log(notification)
     return(<span>{`${notification.project_name} added with pay ${notification.project_pay}`}</span>)

    }

    const handleLogOut =async ()=>{
        const exit_time=new Date().toLocaleTimeString()
        try {
          
              const res=await axios.put(`http://localhost:3001/att/exit/${JSON.parse(localStorage.getItem('attid'))}`,{exit_time});
              console.log("Posted")
              console.log("id",res);
            
          } catch (err) {
              console.log(err);
          }

          localStorage.setItem('username',null);
          localStorage.setItem('id',null);
          localStorage.setItem('attid',null); 
         window.location.replace("/EmployeeLogin")       
    }
    console.log("arr",option)
    
  return (
    <>
    <Navbar>
     <Titlecont>   
    <Title >Payroll 2022</Title>
    </Titlecont>
    <Profile>
    <Icondiv>
    <i class="bi bi-envelope-fill" style={{fontSize:'24px',marginRight:'40px'}}></i>
    <IconCircle>1</IconCircle>
    </Icondiv>
    <Icondiv>
    <i class="bi bi-bell-fill" style={{fontSize:'24px',marginRight:'40px'}} onClick={()=>{setOpen(!open)}}></i>
    <IconCircle>{arr.length }</IconCircle>
    {/* {notification.length ? <IconCircle>{notification.length}</IconCircle> : null} */}
    </Icondiv>    
    <Circle src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_jBNGDAl_gCziVLX5q8vuci3Z8VmfK8Rrdtct54&s'></Circle>   
     <ProfileName>{JSON.parse(localStorage.getItem('username'))}</ProfileName> 
     <button onClick={()=>{handleLogOut()}} style={{marginLeft:"10px",alignContent:"center",backgroundColor:"blue",borderRadius:"10px"}}>Logout</button>
     </Profile>
    {open &&
    <div style={{position:"absolute",top:"60px",right:"50px",border:"1pt solid black",backgroundColor:"grey",width:'auto',borderRadius:"20px",height:"auto",padding:"10px",alignItems:"center"}}>
       { arr.length>0 ?
         arr.map((notification)=>
         <div>
         <li> 
         { displayNotification(notification)}
         </li>
         <Button variant='Danger' marginRight="10px" onClick={()=>{setOpen(false)}}>Close</Button>
         <Button variant='Success' onClick={()=>handleProject(notification)}>Accept</Button>
         </div>
         ):
        <span>nothing</span>}
    </div>
     }
    </Navbar>
    <Page>

    <Sidebar>
    <TextCon>
    <Circle2 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_jBNGDAl_gCziVLX5q8vuci3Z8VmfK8Rrdtct54&s'></Circle2>   
    <Onlinecont><Circlesmall/><span style={{color:'#b8a9a9',fontSize:'12px'}}>Online</span></Onlinecont>        
    </TextCon>
    <Headcon>
    <HeadText href='#' >Reports</HeadText>
    </Headcon>    
    <TextCon>
        <Text href='#' onClick={()=>{Setdisplay({dashboard:true,attendance:false,deduction:false})}} >Dashboard</Text>
    </TextCon>
    <Headcon>
    <HeadText href='#' >Viewables</HeadText>
    </Headcon>    
    <TextCon>
        <Text href='#' onClick={()=>{Setdisplay({dashboard:false,attendance:true,deduction:false})}}>Attendence</Text><br/><br/>
        <Text href='#' onClick={()=>{Setdisplay({dashboard:false,attendance:false,deduction:true})}} >Deductions</Text><br/><br/>
    </TextCon>
    {/* <Headcon>
    <HeadText href='#' >Printables</HeadText>
    </Headcon>
    <TextCon>
    <Text href='#' >Payroll</Text><br/><br/>
    <Text href='#' >Schedule</Text><br/><br/>        
    </TextCon> */}
    </Sidebar>
 
    <Main>
     {display.dashboard &&
       <Project admin={false} eid={getLocid()}/>}
    {
        display.attendance &&
        <Attendance admin={false} id={getLocid()}/>
    }
    {display.deduction &&
       <Deductions admin={false} id={getLocid()}/>}
    </Main>
     
    </Page>
    
    </>
  )
}

export default Home;
