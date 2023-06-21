

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import useTable from './Pagination';
import TableFooter from './Tablefooter';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { width } from '@mui/system';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables(props) {

    const [input,setInput]=useState('');
    const [output,setOutput]=useState([]);
    const [count,setCount]=useState(2)
    //filter
    const [data, setData]=useState();
    const [order, setOrder]=useState("ASC");
    const [sort,setSort]=useState(false);
    const [modal,setModal]=useState(false);


    const [newdata,setnewData]=useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [edit,setEdit]=useState(false);
//  Modal

 const [moddate,setModdate]=useState();
 const [modet,setModEt]=useState();
 const [modex,setModEx]=useState();
 const [modid,setModid]=useState();

    useEffect(() => {
      const getData = async () => {
        try {
          
          
          setnewData(props.data);
          setData(props.data);
  
          
          // result.forEach(element => {
          //     setName([...name,element])
          // });
          
          
          
        } catch (err) {
          setError(err.message);
         // setData(null);
        } finally {
          setLoading(false);
          
        }
      };
      getData();
      
    },[]);

    const handleAbsent = () =>{
      const res=axios.post("http://localhost:3001/att/markabsent")
      alert("Absenties Marked")
      window.location.reload()
    }

    const Updatehandle =(e)=>{
    console.log(e)
    setModal(true)
    setModEt(e.enter_time);
    setModEx(e.exit_time ? e.exit_time : "haven't exit");
    setModdate(e.date);
    setModid(e.idattendance)
    }
    const PostUpdated =async (enter)=>{
      const NewAtt={
        enter_time:modet,
        exit_time:modex,
        date:moddate
      }
      const NewAbs={
        date:moddate,
      }
      console.log(NewAtt);
      try{
        if (enter) {await axios.put(`http://localhost:3001/att/update/${modid}`,NewAtt);setModal(false)}
        else await axios.put(`http://localhost:3001/att/updateabs/${modid}`,NewAbs);
        setModal(false)
        window.location.reload()
      }
      catch(err){
      console.log(err)
      }

    }
    const delatt=(id,enter)=>{
      if (enter) axios.delete(`http://localhost:3001/att/${id}`);
      else axios.delete(`http://localhost:3001/att/attabs/${id}`)
      alert("Deleted successfully");
      window.location.reload()
    };

    const sorting = (col)=> {
      if(count%2===0){
        setSort(!sort);
      }
      setCount(count+1);
      
      console.log(sort)
      if(order === "ASC"){
        const sorted = [...data].sort((a,b) =>
        a[col]>b[col] ? 1: -1
        );
        setData(sorted);
        setOrder("DSC")

        console.log([...data].sort());
      }
      if(order === "DSC"){
        const sorted = [...data].sort((a,b) =>
        a[col]<b[col] ? 1: -1
        );
        setData(sorted);
        setOrder("ASC")
        console.log(data);
      }      
    }

    useEffect(()=>{
        setOutput([]);
        console.log(newdata)
    newdata.filter(val=>{
        console.log(val);
        if(val.employee_name.toLowerCase().includes(input.toLowerCase()))
        {
            setOutput(output=>[...output,val])
        }

    })
    
    },[input])
   
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(newdata, page,5);  
  return (
    <div style={{marginTop:'40px',backgroundColor:'lightgrey',height:'50vh',paddingTop:'20px'}}>
     <div style={{marginBottom:'10px'}}>
       <input style={{border:'1pt solid teal',height:'40px',backgroundColor:'white'}} onChange={e=>setInput(e.target.value)} type='text' placeholder='Search'/> 
     </div>     

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Employee_ID</StyledTableCell>
            <StyledTableCell  >Name</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell  align="right">Time_in <i class="bi bi-caret-down-fill" onClick={()=>sorting("timein")}></i></StyledTableCell>
            <StyledTableCell align="right">Time_out <i class="bi bi-caret-down-fill" onClick={()=>sorting("timeout")}></i></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
 
        <TableBody>
{
  input.length>0 ? 
 
  output.map((row)=>(
    <StyledTableRow key={row.idattendance}>
    <StyledTableCell component="th" scope="row">
      {row.idEmployee}
    </StyledTableCell>
   
          <StyledTableCell>{row.employee_name}</StyledTableCell>
          <StyledTableCell align="right">{row.date}</StyledTableCell>
          {row.enter_time ? <StyledTableCell align="right">{row.enter_time}</StyledTableCell>: <StyledTableCell align="right">Absent</StyledTableCell>}
          {row.enter_time ? <StyledTableCell align="right">{row.exit_time}</StyledTableCell>: <StyledTableCell align="right">Absent</StyledTableCell>}
                   

    <StyledTableCell align="right">
      {/* <Button variant='contained' color='success' style={{marginRight:'10px'}} >Edit</Button> */}
    {props.admin && <Button onClick={()=> {delatt(row.idattendance,row.enter_time)}} variant='contained' color='error'>Delete</Button>}
    
    </StyledTableCell>
  </StyledTableRow>
))
  :null
}          
          
           { input.length<1 &&
              sort ? data.map((row)=>(
                <StyledTableRow key={row.idattendance}>
                <StyledTableCell component="th" scope="row">
                  {row.idEmployee}
                </StyledTableCell>
               
                <StyledTableCell>{row.employee_name}</StyledTableCell>
          <StyledTableCell align="right">{row.date}</StyledTableCell>
          {row.enter_time ? <StyledTableCell align="right">{row.enter_time}</StyledTableCell>: <StyledTableCell align="right">Absent</StyledTableCell>}
          {row.enter_time ? <StyledTableCell align="right">{row.exit_time}</StyledTableCell>: <StyledTableCell align="right">Absent</StyledTableCell>}
                   
  
                <StyledTableCell align="right">
                  {/* <Button onClick={()=>{setEdit(true)}} variant='contained' color='success' style={{marginRight:'10px'}}>Edit</Button> */}
                  <Button onClick={()=> {delatt(row.idattendance,row.enter_time)}} variant='contained' color='error'>Delete</Button>
                
                </StyledTableCell>
              </StyledTableRow>
  
            ))
            :
            input.length<1 &&
          slice.map((row) => (

            <StyledTableRow key={row.idattendance}>
              <StyledTableCell component="th" scope="row">
                {row.idEmployee}
              </StyledTableCell>
             
              <StyledTableCell>{row.employee_name}</StyledTableCell>
          <StyledTableCell align="right">{row.date}</StyledTableCell>
          {row.enter_time ? <StyledTableCell align="right">{row.enter_time}</StyledTableCell>: <StyledTableCell align="right">Absent</StyledTableCell>}
          {row.enter_time ? <StyledTableCell align="right">{row.exit_time}</StyledTableCell>: <StyledTableCell align="right">Absent</StyledTableCell>}
                        

              <StyledTableCell align="right">
                {/* <Button onClick={()=>{Updatehandle(row)}} variant='contained' color='success' style={{marginRight:'10px'}}>Edit</Button> */}
              {props.admin &&  <Button onClick={()=> {delatt(row.idattendance,row.enter_time)}} variant='contained' color='error'>Delete</Button> } 
              
              </StyledTableCell>

  {row.enter_time!="Absent" ? (<Modal show={modal} >
    <Modal.Body >
      <div style={{display:"flex",flexDirection:"column"}}>
      <input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}} placeholder={moddate}  onChange={(e)=>{setModdate(e.target.value)}}></input>
      <input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}} placeholder={modex} onChange={(e)=>{setModEx(e.target.value)}}></input>
     <input type={"text"} style={{height:"5vh",backgroundColor:"white",border:"1pt solid teal",marginBottom:"10px"}} placeholder={modet} onChange={(e)=>{setModEt(e.target.value)}}></input>     
      </div>
      <Button onClick={()=>{setModal(false)}}>Close</Button>
      <Button onClick={()=>{PostUpdated(row.enter_time)}} style={{float:"right"}}>Update</Button>
    </Modal.Body>
    </Modal>)
    :
    null   
    }
            </StyledTableRow>            
          ))}
         

        </TableBody>
      </Table>
    </TableContainer>   
    {!sort && <TableFooter range={range} slice={slice} setPage={setPage} page={page} />}

    {/* Update Modal */}
   {props.admin && <Button onClick={()=>{handleAbsent()}}  style={{width:"20%"}}>Mark As Absent</Button>} 
   </div> 
     
  );
}
