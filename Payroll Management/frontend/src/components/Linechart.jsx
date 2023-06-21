
import React,{useState,useEffect} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



const arr=[];
const obj={Days:'null',Currentrate: 'null',rate: 'null'};

export default function Linechart() {

  const [data,SetData]=useState();
  const [day,SetDay]=useState(true);
  const [rate,SetRate]=useState();

  const url= "http://localhost:3001/progress/P102"
  useEffect(()=>{
     
      fetch(url).
      then(result => result.json()).
      then(data => {
       
        SetData(data)

        for(var i=1;i<data[0].Days;i++)
        {
          arr.push({name:"Day"+i,uv:data[0].rate});
        }
        let ind=arr.findIndex((obj => obj.name === 'Day3'));
        arr[ind].Currentrate=data[0].Currentrate;
      }).catch(e=>{
          console.log(e);
      })

  },[]);  

  for(var i=0;i<arr.length;i++)
{
  console.log(arr[i]);
}
  return (
    <LineChart
      width={500}
      height={300}
      data={arr}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}
