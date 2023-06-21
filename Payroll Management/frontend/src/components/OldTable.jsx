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



const rows = [
{
    employee_id:1,
    date:23,
    name:'ali',
    timein:12,
    timeout:34
},
{
    employee_id:2,
    date:21,
    name:'hasan',
    timein:11,
    timeout:32
},
{
    employee_id:3,
    date:23,
    name:'zain',
    timein:19,
    timeout:37
},
{
    employee_id:4,
    date:23,
    name:'zain',
    timein:10,
    timeout:38
}
,{
    employee_id:5,
    date:23,
    name:'zain',
    timein:16,
    timeout:3
}
];


export default function CustomizedTables() {

    const [input,setInput]=useState('');
    const [output,setOutput]=useState([]);
    const [count,setCount]=useState(2)
    //filter
    const [data, setData]=useState(rows);
    const [order, setOrder]=useState("ASC");
    const [sort,setSort]=useState(false);

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
    rows.filter(val=>{
        if(val.name.toLowerCase().includes(input.toLowerCase()))
        {
            setOutput(output=>[...output,val])
        }
    })
    },[input])
   
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(rows, page,2);  
  return (
    <div>
     <div style={{display:'flex',justifyContent:'space-between'}}>

       <input onChange={e=>setInput(e.target.value)} type='text' placeholder='Search'/> 
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
    <StyledTableRow key={row.employee_id}>
    <StyledTableCell component="th" scope="row">
      {row.employee_id}
    </StyledTableCell>
   
          <StyledTableCell>{row.name}</StyledTableCell>
          <StyledTableCell align="right">{row.date}</StyledTableCell>
          <StyledTableCell align="right">{row.timein}</StyledTableCell>
          <StyledTableCell align="right">{row.timeout}</StyledTableCell>                    

    <StyledTableCell align="right">
      <Button variant='contained' color='success' style={{marginRight:'10px'}}>Edit</Button>
      <Button variant='contained' color='error'>Delete</Button>
    
    </StyledTableCell>
  </StyledTableRow>
))  
  :null
}          
          
           { input.length<1 &&
              sort ? data.map((row)=>(
                <StyledTableRow key={row.employee_id}>
                <StyledTableCell component="th" scope="row">
                  {row.employee_id}
                </StyledTableCell>
               
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell align="right">{row.date}</StyledTableCell>
                      <StyledTableCell align="right">{row.timein}</StyledTableCell>
                      <StyledTableCell align="right">{row.timeout}</StyledTableCell>                    
  
                <StyledTableCell align="right">
                  <Button variant='contained' color='success' style={{marginRight:'10px'}}>Edit</Button>
                  <Button variant='contained' color='error'>Delete</Button>
                
                </StyledTableCell>
              </StyledTableRow>
  
            ))
            :
            input.length<1 &&
          slice.map((row) => (

            <StyledTableRow key={row.employee_id}>
              <StyledTableCell component="th" scope="row">
                {row.employee_id}
              </StyledTableCell>
             
                    <StyledTableCell >{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.timein}</StyledTableCell>
                    <StyledTableCell align="right">{row.timeout}</StyledTableCell>                    

              <StyledTableCell align="right">
                <Button variant='contained' color='success' style={{marginRight:'10px'}}>Edit</Button>
                <Button variant='contained' color='error'>Delete</Button>
              
              </StyledTableCell>
            </StyledTableRow>            
          ))}
         

        </TableBody>
      </Table>
    </TableContainer>   
    {!sort && <TableFooter range={range} slice={slice} setPage={setPage} page={page} />}
    </div>
  );
}
