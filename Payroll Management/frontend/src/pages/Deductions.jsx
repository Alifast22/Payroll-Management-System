import styled from 'styled-components';
import React,{useState,useEffect} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import axios from 'axios'
import { Modal } from 'react-bootstrap';
import { useAsyncError } from 'react-router';
const Deductions = ({admin=true,id}) => {
    const [data,setData]=useState("")
    const [flag,setFlag]=useState(false)
    const [modal,setModal]=useState(false);

    const [modamount,setModamount]=useState()
    const [modid,setModid]=useState();

    let response,columns;
  useEffect(() => {
    const getData = async () => {
      try {
        if (admin)
        {
            
           response = await fetch(
          `http://localhost:3001/payments/allpayments`
        );
      }
        else{
           
           response = await fetch(`http://localhost:3001/emp/${id}/getpayments`)
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
      if(modamount <0){
        alert("Invalid Update")
        return
      }
      const NewDed={
        deduc_amount:modamount
      }
      
      try{
        const res=await axios.put(`http://localhost:3001/payments/${modid}`,NewDed)
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
    
        
        { field: 'date', headerName: 'Late Entry Date', width: 130 },
        { field: 'enter_time', headerName: 'Late Entry Time', width: 130 },
        { field: 'deduc_amount', headerName: 'Salary Deducted(Rupees)', width: 180 },
        {field: 'idEmployee', headerName: 'Employee  Id', width: 130},
        {field: 'employee_name', headerName: 'Employee Name', width: 130},
    
        {
          field: "Delete",
          renderCell:  (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  console.log(cellValues.row.idpayments)
                 
                 axios.delete(`http://localhost:3001/payments/${cellValues.row.idpayments}`);
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
                  setModid(cellValues.row.idpayments)
                  setModamount(cellValues.row.deduc_amount);
                  

                
                }}
              >
                Edit
              </Button>
            );
          }
        }
        
      ];
      else
       columns = [
    
        
        { field: 'date', headerName: 'Late Entry Date', width: 130 },
        { field: 'enter_time', headerName: 'Late Entry Time', width: 130 },
        { field: 'deduc_amount', headerName: 'Salary Deducted(Rupees)', width: 180 },

        
      ];
      
      const rows = data;
      
      console.log(rows)
    
    return (
        <><h2>Deductions</h2>
        <div style={{height: 400, width: '100%' }}>
      
        

<DataGrid
  rows={rows}
  columns={columns}
  pageSize={5}
  getRowId={row =>  row.idpayments}
  rowsPerPageOptions={[7]}
  
/>

        </div>

        <Modal show={modal} >
    <Modal.Body >
      <div style={{display:"flex",flexDirection:"column"}}>
      <span>Amount:</span><input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}} placeholder={modamount}  onChange={(e)=>{setModamount(e.target.value)}}></input>
           
      </div>
      <Button onClick={()=>{setModal(false)}}>Close</Button>
      <Button onClick={()=>{PostUpdated()}} style={{float:"right"}}>Update</Button>
    </Modal.Body>
    </Modal>
        </>
    )
  }
  
  export default Deductions
  