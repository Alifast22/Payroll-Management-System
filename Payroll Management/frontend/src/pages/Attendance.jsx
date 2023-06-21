import styled from 'styled-components';
import React,{useState,useEffect} from 'react'
import Table from '../components/Table'
import axios from 'axios';

const Button=styled.button`
   background-color: #3c95c9;
   width: 8%;
   display: flex;
   align-self: flex-start;
   align-items: center;
   border: none;
   color: white;
`
const Attendance = ({admin,id,all}) => {
  const [data,setData]=useState("")
  let response;
  ;
  useEffect(() => {
    const getData = async () => {
      try {
        if (admin )
        {
          if(all)
          {
           response = await fetch(
          `http://localhost:3001/att`);
         }
         else{
          response = await fetch(
            `http://localhost:3001/att/gettodayatt`);            
        }         
        }
        else{
           response = await fetch(`http://localhost:3001/emp/${id}/getatt`)
        }

        const result=await response.json();
 
        setData(result);
        
        
        
      } catch (err) {
        //setError(err.message);
       // setData(null);
      } finally {
        //setLoading(false);
        
      }
    };
    getData();
    
  },[]);



  return (
    <div> 


        
      {data.length>0 && <Table data={data} admin={admin}/>}
     
    </div>
  )
}

export default Attendance
