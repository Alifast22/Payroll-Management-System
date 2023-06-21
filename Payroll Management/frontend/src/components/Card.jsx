import { Button} from '@mui/material'
import { Modal } from 'react-bootstrap'
import Linechart from './Linechart'
import { useEffect } from "react";
import React, { useState } from 'react'
import styled from 'styled-components'
import image from '../images/project_template.jpg'
import axios from "axios"


const CardsCont=styled.div`
display: flex;
flex-direction: column;
`
const Cont=styled.div`
width: 50%;
display: flex;
position: relative;
`
const Img=styled.img`
width: 100%; 

position: inline-block;
object-fit: cover;
`
const Text=styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
position: absolute;
`
const Title=styled.span`
font-size: 24px;
font-weight: 200px;
position: absolute;
left:20px;
top: 11rem;
`
const Desc=styled.span`
font-size: 24px;
font-family: monospace;
font-weight: 100px;
margin-top: 30px;
`
const DateCon=styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
width: 100%;
margin-top: 10px;
position: absolute;
top: 5rem;
margin-right: 20px;
`

const Posted=styled.span`
font-size: 14px;
font-weight: 700px;
color: #19c919;
`
const Deadline=styled.span`
font-size: 14px;
font-weight: 700px;
color: #cc2a2a;
`
const CircleCon =styled.div`
display: flex;
width: 100%;
height: 3vh;
justify-content: center;
margin-top: 10px;
position: absolute;
top: 6rem;
`
const Circle=styled.div`
width: 3vw;

border-radius: 50px;
background-color: ${(props) => props.color};
margin-right: 10px;
`
const Card = ({obj:{idprojects,project_name,project_status},admin}) => {
    const [modal,setModal]=useState(false);
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
    const [blue, setBlue] = useState(false);
    var idEmployee=7
    !admin && console.log("emp",admin)
    admin && console.log("admin",admin)
    // let idprojects,project_name,project_status;
    // console.log(props)
    // if (props.obj){
    //     ({idprojects,project_name,project_status}=props.obj)
    // }
    //obj.idprojects,obj.project_name,project_status,admin

    const handleSubmit =async (e)=>{

      try {
    
        const res=await axios.post(`http://localhost:3001/projects/picked/${idprojects}`,idEmployee);
        console.log("Posted")
        console.log(res);
        
    } catch (err) {
        console.log(err);
    }
    
      }

     
      

  return (    
      
    
    
       
        <Cont>
    
    <Img src={image}/>
    <Text>
    <Title>{'P'+idprojects}</Title>
    <Desc>{project_name}</Desc>
    <DateCon>
        <Posted><i class="bi bi-file-post" style={{fontSize:'20px'}}></i> 23 Jun</Posted>
        <Deadline><i class="bi bi-exclamation-circle" style={{fontSize:'20px'}} ></i> 5 July</Deadline>
    </DateCon>
    <CircleCon>
     
   
         <Circle color='#e01a1a'/> 
        {project_status==="Picked" || project_status==="Completed" ? <Circle   color='#1983e6'/> : <Circle   color='#1983e671'/>}
        {project_status==="Completed" ? <Circle color='#10c910'/> : <Circle color='#10c91061'/>}
    </CircleCon>

 </Text>

     {/* Modal part */}
    <Modal show={modal}>
    <Modal.Body style={{alignSelf:'flex-end'}}>
       <Linechart style={{width:'100%'}}/>
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={()=>setModal(false)}>
            Close
        </Button>
    </Modal.Footer>
    </Modal>      
    
</Cont>  

          
  )
 
}

export default Card
