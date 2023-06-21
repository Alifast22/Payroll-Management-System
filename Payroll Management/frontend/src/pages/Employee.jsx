import styled from 'styled-components';
import React,{useState,useEffect} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import axios from 'axios'
import { Modal } from 'react-bootstrap';
import { useAsyncError } from 'react-router';
const Employee = ({admin=true,id}) => {
    const [data,setData]=useState("")
    const [flag,setFlag]=useState(false)
    const [modal,setModal]=useState(false);
    const [mod,setMod]=useState(false);

    const [modpay,setModpay]=useState()
    const [modpost,setModpost]=useState()
    const [modid,setModid]=useState();    
    
    const [modalpay,setModalpay]=useState()
    const [modalpost,setModalpost]=useState()
    const [modalname,setModalname]=useState();



    let response,columns;
  useEffect(() => {
    const getData = async () => {
      try {
        if (admin)
        {
            
           response = await fetch(
          `http://localhost:3001/emp`
        );
      }


        const result=await response.json();
        console.log(result)
        setData(result);
        
        
        
      } catch (err) {
        //setError(err.message);
       // setData(null);
      } finally {
        //setLoading(false);
        
      }
    };
    getData();
    
  },[flag]);

  const Updatehandle =(e)=>{
    console.log(e)
    // setModal(true)
    // setModEt(e.enter_time);
    // setModEx(e.exit_time ? e.exit_time : "haven't exit");
    // setModdate(e.date);
    // setModid(e.idattendance)
    }
    const PostUpdated =async ()=>{
        if(modpay<0)
        {
            alert("Invalid data update")
            return
        }
      const NewEmp={
        hourly_pay:modpay,
        post:modpost
      }
      
      try{
        const res=await axios.put(`http://localhost:3001/emp/${modid}`,NewEmp)
        console.log(res)
        setModal(false)
        setFlag(!flag);
      }
      catch(err){
      console.log(err)
      }
    }

     if(admin) 
     
     columns = [
    
        
        { field: 'idEmployee', headerName: 'Employee Id', width: 130 },
        { field: 'employee_name', headerName: 'Employee Name', width: 130 },
        { field: 'hourly_pay', headerName: 'Hourly Pay', width: 180 },
        {field: 'post', headerName: 'Post', width: 130},

    
        {
          field: "Delete",
          renderCell:  (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {

                 
                 axios.delete(`http://localhost:3001/emp/${cellValues.row.idEmployee}`);
                   alert("Deleted successfully");
                   setFlag(!flag);
                  
                   console.log(flag)

                }}
              >
                Delete
              </Button>
            );
          }
        },
        {
          field: "Edit",
          renderCell:  (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  console.log(cellValues.row.idpayments)
                  setModal(true)
                  setModid(cellValues.row.idEmployee)
                  setModpay(cellValues.row.hourly_pay);
                  setModpost(cellValues.row.post);
                  

                
                }}
              >
                Edit
              </Button>
            );
          }
        }
        
      ];


      const rows = data;
 const EmployeeAdd = async() =>{
    if(!modalname || !modalpay || !modalpost)
    {
      alert("Fill all columns");
      return
    }    
if(modalpay<0)
{
    alert("Invalid data entered")
    return;
}
    const newEmp ={
       employee_name:modalname,
       hourly_pay:modalpay,
       post:modalpost
    };

    try{
    const res= await axios.post("http://localhost:3001/emp/insert",newEmp)
    alert("employee added")
    setMod(false)
    window.location.reload()
    }
    catch (err){
        console.log(err)
    }
 }      
      console.log(rows)
    
    return (
        <><h2>Employees</h2>
        <div style={{height: 400, width: '100%' }}>
      
        <Button onClick={()=>{setMod(true)}}>Add</Button>

<DataGrid
  rows={rows}
  columns={columns}
  pageSize={15}
  getRowId={row =>  row.idEmployee}
  rowsPerPageOptions={[7]}
  
/>

        </div>

        <Modal show={modal} >
    <Modal.Body >
      <div style={{display:"flex",flexDirection:"column"}}>
      <span>Pay:</span><input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}} placeholder={modpay}  onChange={(e)=>{setModpay(e.target.value)}}></input>
      <span>Post:</span><input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}} placeholder={modpost}  onChange={(e)=>{setModpost(e.target.value)}}></input>
           
      </div>
      <Button onClick={()=>{setModal(false)}}>Close</Button>
      <Button onClick={()=>{PostUpdated()}} style={{float:"right"}}>Update</Button>
    </Modal.Body>
    </Modal>

    <Modal show={mod}>
        <Modal.Body>
        <div style={{display:"flex",flexDirection:"column"}}>
      <span>Name:</span><input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}}  onChange={(e)=>{setModalname(e.target.value)}}></input>
      <span>Post:</span><input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}}   onChange={(e)=>{setModalpost(e.target.value)}}></input>
      <span>Hourly Pay:</span><input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}}   onChange={(e)=>{setModalpay(e.target.value)}}></input>
           
           
      </div>
      <Button onClick={()=>{setMod(false)}}>Close</Button>
      <Button onClick={()=>{EmployeeAdd()}} style={{float:"right"}}>Update</Button>
        </Modal.Body>
    </Modal>
        </>
    )
  }
  
  export default Employee
  