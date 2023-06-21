import { Button } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'
import { io} from "socket.io-client";

const Spinner = styled.div`
  border: 16px solid lightblue;
  border-top: 16px #385f87 solid;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  animation: spin 2s linear infinite;
  /* 
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite; */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`

const FormDiv=styled.div`

display: flex;
flex-direction: column;
`

const FormIn=styled.input`
    margin-top: 10px;
    border: 1pt solid teal;
    height: 40px;
    background-color: white;
`
const Formtext=styled.textarea`
  margin-top: 10px;

  height: 70px;
  border: 1pt solid teal;
`
const CardDiv=styled.div`
display:flex;
justify-content: center;
margin-top: 20px;
`
const ProjectCon=styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;

`

// const Navbar=styled.div`
//   background-color: #6298ad;
//   display: flex;
//   justify-content: space-around;
//   color: white;
//   height: 10vh;
//   text-align: end;
// `
// const Title= styled.span`
//     flex: 1;
//     display: flex;
//     align-self: flex-start;
//     margin-left: 20px;
//     margin-right: 40px;
//     margin-top: 15px;
//     font-size: 24px;
// `
// const Titlecont=styled.div`
//     display: flex;
//     align-items: center;
//     text-align: center;

// `
// const Profile=styled.div`
//    flex: 1;
   
//    margin-right: 30px;
//    display: flex;
//    justify-content: end;
//    align-items: center ;
// `
// const ProfileName= styled.span`
//    font-weight:300;
//    margin-left: 10px;
   
// `
// const Circle=styled.img`
//     border-radius: 50px;
//     width: 50px;
//     height: 50px;
//     object-fit: cover;
// `
// const Sidebar=styled.div`
//     flex: 1;
//     width: 100%;
//     height: 100vh;
//     background-color: #272727;
//     display: flex;
//     flex-direction: column;
// `
// const TextCon=styled.div`
//      background-color: #4c4c63;
//      height: auto;
//      padding:10px;
// `
// const Text=styled.a`
//     color: #a09595;
//     text-decoration: none;
// `
// const HeadText=styled.a`
//     color: #a09595;
//     text-decoration: none;
//     font-size: 14px;
// `
// const Headcon=styled.div`
//     background-color: #272727;
//     height: 40px;
//     padding: 10px;
// `
// const Circle2=styled.img`
//     height: 10vh;
//     width: 10vh;
//     border-radius: 10px;
//     object-fit: cover;
// `
// const Circlesmall=styled.div`
//     height: 7px;
//     width: 7px;
//     border-radius: 50px;
//     background-color: #3bd33b;
//     margin-right: 10px;
// `

// const Onlinecont=styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `
// const Page=styled.div`
//     display: flex;
// `
// const Main=styled.div`
//     flex: 5;
//     background-color: #d4dee9;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

// `
const Project = ({admin,eid}) => {
  const [modal,setModal]=useState(false);
  const [projectid,setProjectid] = useState("");
  const [title,setTitle] = useState("");
  const [day,setDay] = useState("");
  const [pay,setPay] = useState("");
  const [des,setDes] = useState("");
  const [status,setStatus] = useState("NotPicked");

  const [soc,setSoc] =useState();
  const [error,setError]=useState(null);
console.log(admin)
  let adminName="ali65";
  let projectTitle="6";
  console.log(eid)
 useEffect(()=>{
  const socket=io("http://localhost:4000")
  setSoc(socket);
 },[])

 const [msgp,setMsgp]=useState("")
 const [data,setData]=useState([])
 const [loading, setLoading] = useState(true);
    let response;
  useEffect(() => {



    const getData = async () => {
      try {
        if (admin){ 
          
          response = await fetch(
          `http://localhost:3001/projects`
        );
        }
        else{
          response=await fetch(`http://localhost:3001/emp/${eid}/getprojs`)
        }

        const result=await response.json();
        console.log(result)
        setData(result);
           
        
      } catch (err) {
        setError(err.message);
       // setData(null);
      } finally {
        setLoading(false);
        if (data.length==0){setMsgp("No projects!")}
        
      }
    };
    getData();
    
  },[]);
    

  

const handleNotification =async ()=>{
  try {

    const res=await axios.get(`http://localhost:3001/projects/${title}`);
  
    console.log(res.data.insertId)
    soc.emit("sendNotification",adminName,title)
   // res.data[0].idprojects
} catch (err) {
    console.log(err);
}


  
  


};



  const handleSubmit =async (e)=>{
    if(!title,!day,!pay)
    {
      alert("Fill required columns");
      return
    }
    e.preventDefault();
    if(day<0 || pay<0)
    {
      alert("Invalid data entered")
      return;
    }
    const newProject ={
      project_name:title,
      project_day:day,
      project_pay:pay,
      Description:des,
      project_status:status
  };
  try {

    const res=await axios.post("http://localhost:3001/projects/insert",newProject);
    console.log("Posted")
    console.log(res);
    handleNotification();
    setModal(false)
    window.location.reload()
    
} catch (err) {
    console.log(err);
}

  }
  return (
    <ProjectCon>
      {/* Navbar */}
    {/* <Navbar>
     <Titlecont>   
    <Title >Payroll 2022</Title>
    <i class="bi bi-list" style={{fontSize:'24px'}}></i>
    </Titlecont>
    <Profile>
    <Circle src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_jBNGDAl_gCziVLX5q8vuci3Z8VmfK8Rrdtct54&s'></Circle>   
     <ProfileName>ali</ProfileName> 
     </Profile>
    </Navbar> */}

 
    {/* sidebar */}
    {/* <Sidebar>
    <TextCon>
    <Circle2 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_jBNGDAl_gCziVLX5q8vuci3Z8VmfK8Rrdtct54&s'></Circle2>   
    <Onlinecont><Circlesmall/><span style={{color:'#b8a9a9',fontSize:'12px'}}>Online</span></Onlinecont>        
    </TextCon>
    <Headcon>
    <HeadText href='#' >Reports</HeadText>
    </Headcon>    
    <TextCon>
        <Text href='#' >Dashboard</Text>
    </TextCon>
    <Headcon>
    <HeadText href='#' >Manage</HeadText>
    </Headcon>    
    <TextCon>
        <Text href='#' >Attendence</Text><br/><br/>
        <Text href='#' >Employees</Text><br/><br/>
        <Text href='#' >Deductions</Text><br/><br/>
        <Text href='#' >Positions</Text><br/><br/>
    </TextCon>
    <Headcon>
    <HeadText href='#' >Printables</HeadText>
    </Headcon>
    <TextCon>
    <Text href='#' >Payroll</Text><br/><br/>
    <Text href='#' >Schedule</Text><br/><br/>        
    </TextCon>
    </Sidebar> */}

   {/* main */}
  

      {admin &&
      <Button style={{marginTop:"10px",marginRight:"450px"}} variant='outlined' onClick={()=>setModal(true)}>ADD</Button>
      }
      
      {/* Project add modal */}
      <Modal show={modal}>
        <Modal.Header style={{alignSelf:'center'}}>
          <h2 >New Project</h2>
        </Modal.Header>
    <Modal.Body style={{alignSelf:'center'}}>
      
      <form>
      <FormDiv>

       <FormIn onChange={(e)=> {setTitle(e.target.value)}} placeholder='Title'/>
       <FormIn onChange={(e)=> {setDay(e.target.value)}} placeholder='Days..'/>
       <FormIn onChange={(e)=> {setPay(e.target.value)}} placeholder='Payment..'/>
       <Formtext onChange={(e)=> {setDes(e.target.value)}} placeholder='Description'/>
 
       </FormDiv>
       <div style={{display:'flex',justifyContent:'flex-end'}}>
       <Button type='submit' style={{marginTop:'20px'}} variant='contained' color='success' onClick={handleSubmit}>Submit</Button>
       </div>
       </form>
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={()=>setModal(false)}>
            Close
        </Button>
    </Modal.Footer>
    </Modal> 
   
       {loading && <Spinner>Loading.....</Spinner>}
       <div> 
      {data.length>0?
      data.map(person =>
     <li key={person.idprojects} style={{listStyle:'none'}}> 
       <CardDiv>
        <Card obj={person} admin />
        </CardDiv>
       </li>) :<h3>{msgp}</h3>
        }
        
        </div>
      
    </ProjectCon>
  )
}

export default Project
