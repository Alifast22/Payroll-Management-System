import React, { PureComponent, useEffect,useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
const data = [
  {
    month:"Jan",
    count:4
  }, 
  {
    month:"Feb",
    count:6
  },  
  {
    month:"Mar",
    count:7
  },  
  {
    month:"Apr",
    count:0
  },  
  {
    month:"May",
    count:0
  },  
  {
    month:"Jun",
    count:0
  },  
  {
    month:"Jul",
    count:0
  },  
  {
    month:"Aug",
    count:0
  },  {
    month:"Sep",
    count:0
  },  {
    month:"Oct",
    count:0
  },  {
    month:"Nov",
    count:0
  },  {
    month:"Dec",
    count:0
  }
];

export default function App(){

  const [change,setChange]=useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        
           const response = await fetch(
          `http://localhost:3001/att/monthlyreport`);
       
       
      //  data[10]={count:'10'}
        const result=await response.json();
        result.map((e) =>(
          data[e.month-1].count=e.count
          ))
          
       
console.log(data)
        
        
      } catch (err) {
        //setError(err.message);
       // setData(null);
      }
    };
    getData();
    
  },data);


    return (

      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={100}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
         
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }

