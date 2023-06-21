import { Link } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Graph from '../components/Graph'
import Attendance from './Attendance';
import Project from './Project';
import Deductions from './Deductions'
import Employee from './Employee'
import axios from 'axios'
const Navbar=styled.div`
  background-color: #6298ad;
  display: flex;
  justify-content: space-around;
  color: white;
  height: 10vh;
  text-align: end;
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
`
const Main=styled.div`
    flex: 5;
    background-color: #d4dee9;
    display: flex;
    flex-direction: column;


`
const BoxCont= styled.div`
    display: flex;
    height: 25vh;
    width: 100%;
`
const Box=styled.div`
    background-color: ${(props) => props.color};
    width: 100%;
    margin: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
`
const Boxtextcon=styled.div`
 display:flex;
 flex-direction: column;
 align-items: flex-start;
 margin-left: 10px;
`
const BoxNun=styled.span`
    font-size: 40px;
    font-weight: 500px;
`
const Boxtext=styled.span`
    font-size: 18px;
    font-weight: 200px;
`
const Graphcon=styled.div`
   margin-top :40px ;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100vh;
`
const Graphtextcon=styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const Graphtext=styled.span`
    color: black;
    font-size: 18px;
    font-weight: 100px;
`
const FilterCon=styled.div`
    display: flex;
    border:1pt solid teal;
    padding: 5px;
`
const FilterYear=styled.select`
     font-size: 16px;
     background: none;
     border: none;
     padding: 5px;
`
const FilterYearOption=styled.option`
    font-size: 16px;
`
const Filtertitle=styled.span`
    font-size: 18px;
    font-weight: 200px;
`
const Home = () => {

    const [value,setValue]=useState(true);
    const [display,Setdisplay]=useState({dashboard:true,attendance:false,attendanceall:false,project:false,deductions:false,employee:false})
    console.log(value)

    const [empdata,setEmpdata]=useState();
    const [attdata,setAttdata]=useState();
    const [ontimedata,setOntimedata]=useState();
    const [latedata,setLatedata]=useState();


    useEffect(async ()=>{
        const emp=await axios.get("http://localhost:3001/emp/noofemp");
         const att=await axios.get("http://localhost:3001/att/gettodayperc")
         const ontimelate=await axios.get("http://localhost:3001/att/getontime")
         setEmpdata(emp.data[0].count);
         setAttdata(att.data.percentage);
         ontimelate.data.map(e=>{
            if (e.ontime=='T') setOntimedata(e.count)
            else if (e.ontime=='F') setLatedata(e.count)
         })
       
    },[])

   const HandleLogout = () => {
      localStorage.setItem("admin",null)
      window.location.replace("/AdminLogin")
   }    
    
  return (
    <>

    <Navbar>
     <Titlecont>   
    <Title >Payroll 2022</Title>
    <i class="bi bi-list" style={{fontSize:'24px'}} onClick={()=>setValue(!value)}></i>
    </Titlecont>
    <Profile>
    <Circle src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_jBNGDAl_gCziVLX5q8vuci3Z8VmfK8Rrdtct54&s'></Circle>   
     <ProfileName>{localStorage.getItem('admin')}</ProfileName> 
     </Profile>
     <Button onClick={()=>{HandleLogout()}} style={{color:'white'}}>Logout</Button>
    </Navbar>
    <Page>
 {value &&
    <Sidebar>
    <TextCon>
    <Circle2 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_jBNGDAl_gCziVLX5q8vuci3Z8VmfK8Rrdtct54&s'></Circle2>   
    <Onlinecont><Circlesmall/><span style={{color:'#b8a9a9',fontSize:'12px'}}>Online</span></Onlinecont>        
    </TextCon>
    <Headcon>
    <HeadText href='#' >Reports</HeadText>
    </Headcon>    
    <TextCon>
    <Text href='#' onClick={()=>{Setdisplay({dashboard:true,attendance:false,attendanceall:false,project:false,deductions:false,employee:false})}} >Dashboard</Text><br/><br/>      
    </TextCon>
    <Headcon>
    <HeadText href='#' >Manage</HeadText>
    </Headcon>    
    <TextCon>
        <Text href='#'  onClick={()=>{Setdisplay({dashboard:false,attendance:false,attendanceall:true,project:false,deductions:false,employee:false})}} >Attendence</Text><br/><br/>
        <Text href='#' onClick={()=>{Setdisplay({dashboard:false,attendance:false,attendanceall:false,project:false,deductions:false,employee:true})}}>Employees</Text><br/><br/>
        <Text href='#' onClick={()=>{Setdisplay({dashboard:false,attendance:false,attendanceall:false,project:false,deductions:true,employee:false})}} >Deductions </Text><br/><br/>
        <Text href='#' onClick={()=>{Setdisplay({dashboard:false,attendance:false,attendanceall:false,project:true,deductions:false,employee:false})}} >Projects</Text><br/><br/>
        
    </TextCon>
    {/* <Headcon>
    <HeadText href='#' >Printables</HeadText>
    </Headcon>
    <TextCon>
    <Text href='#' >Payroll</Text><br/><br/>
    <Text href='#' >Schedule</Text><br/><br/>        
    </TextCon> */}
    </Sidebar>
 }
    <Main>
        <div style={{display:"flex"}}>
        {display.attendance  && <Button  style={{marginTop:"2px", color:"black",width:"12%",backgroundColor:"white"}} onClick={()=>{Setdisplay({dashboard:false,attendanceall:true,attendance:false,project:false,deductions:false})}}>Show All</Button>}
        {display.attendanceall && <Button style={{marginTop:"2px", color:"black",width:"12%",backgroundColor:"white"}} onClick={()=>{Setdisplay({dashboard:false,attendanceall:false,attendance:true,project:false,deductions:false})}}>Show Today</Button>}
        </div>
        
       { display.dashboard &&
       <BoxCont>       
      <Box color='#4ba7c5'>
      <Boxtextcon>
       <BoxNun>{empdata}</BoxNun>
       <Boxtext>Total Employees</Boxtext>
       </Boxtextcon>     
      <i class="bi bi-person" style={{fontSize:'80px',marginRight:'10px',color:'#0a0a0ab7'}}></i>
      </Box>       
      <Box color='#209720'>
      <Boxtextcon>
       <BoxNun>{attdata}%</BoxNun>
       <Boxtext>Attendance</Boxtext>
       </Boxtextcon>        
      <i class="bi bi-card-checklist" style={{fontSize:'80px',marginRight:'10px',color:'#0a0a0ab7'}}></i>
      </Box>       
      <Box color=' #c5c547'>
      <Boxtextcon>
       <BoxNun>{ontimedata ? ontimedata : 0}</BoxNun>
       <Boxtext>On Time Today</Boxtext>
       </Boxtextcon>
       <i class="bi bi-clock " style={{fontSize:'80px',marginRight:'10px',color:'#0a0a0ab7'}}></i>
      </Box>  
      <Box color=' #c22a2a'>
        <Boxtextcon>
       <BoxNun>{latedata ? latedata : 0}</BoxNun>
       <Boxtext>Late Today</Boxtext>
       </Boxtextcon>
      <i class="bi bi-exclamation-circle " style={{fontSize:'80px',marginRight:'10px',color:'#0a0a0ab7'}}></i>
      </Box>      
      </BoxCont>}
      {display.dashboard &&
        <Graphcon>
        <Graphtextcon>
        <Graphtext>Monthly Attendance</Graphtext>
         {/* <FilterCon>
         <Filtertitle> Year : </Filtertitle>
        <FilterYear>
        <FilterYearOption>2010</FilterYearOption>
        <FilterYearOption>2011</FilterYearOption>
        <FilterYearOption>2012</FilterYearOption>
        </FilterYear>
        </FilterCon> */}

        </Graphtextcon>
        <Graph />
      </Graphcon>}
         
       {display.project && 
       <Project admin={true}/>
       }       
       {display.attendanceall && 
       <Attendance admin={true} all={true}/>
       }       
       {display.attendance && 
       <Attendance admin={true}/>
       }
       {display.deductions && 
       <Deductions admin={true}/>
       }   
       {display.employee && 
       <Employee admin={true}/>
       }    
         
      
    </Main>
     
    </Page>
    </>
  )
}

export default Home;
