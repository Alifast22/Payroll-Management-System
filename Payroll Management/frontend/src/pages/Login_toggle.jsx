import styled from 'styled-components';
import React from 'react';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import AdminLogin from './AdminLogin';

const CoverDiv=styled.div`
   border :1pt solid;
   height: 100vh;
   width: 100%;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
  
   `

const CoverImg=styled.img`
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    object-fit: fill;
    position: absolute;
    
`
const TextDiv=styled.div`
    display: flex;
   flex-direction: column;
   background-color: #777777a4;
   border-radius: 20px;
   position: absolute;
   align-items: center;
   color: black;
   padding-top:50px;
   width: 50%;
   height:50vh;
`
const Head=styled.span`
  font-size: 40px;
  font-weight: 400px;
  margin-bottom: 30px;
  
`
const Login_toggle = () => {
  return (
    <div>
        <CoverDiv>

        <CoverImg src={'https://hbr.org/resources/images/article_assets/2020/07/BI_OFFICE_Gavett-FEATURE.jpg'}/>
       <TextDiv>
        <Head style={{borderTop:'1pt dashed black'}}>
            Welcome To Payroll Management
        </Head>
        <Button  variant="outlined"  style={{width:'100px', border:'1pt solid white',fontSize:'40',marginTop:'20px',marginBottom:'40px',}} ><Link to={'/AdminLogin'} style={{color:'white',textDecoration:'none',fontWeight:'300px'}}>Admin</Link></Button>
        <Button  variant="outlined"  style={{width:'100px', border:'1pt solid white',fontSize:'40'}}><Link to={'/EmployeeLogin'} style={{color:'white',textDecoration:'none',fontWeight:'300px'}}>Employee</Link></Button>
        </TextDiv>
        </CoverDiv>
    </div>
  )
}

export default Login_toggle
