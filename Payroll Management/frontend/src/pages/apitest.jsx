import React, { useState } from 'react'
import { useEffect } from 'react';



var arr=[];
const obj={Days:'null',Currentrate: 'null',rate: 'null'};
const apitest = () => {

    const [data,SetData]=useState();
    const [day,SetDay]=useState(true);
    const [rate,SetRate]=useState();

    const url= "http://localhost:3001/progress/P102"
    useEffect(()=>{
       
        fetch(url).
        then(result => result.json()).
        then(data => {
          console.log(data)
          SetData(data)

          for(var i=1;i<data[0].Days;i++)
          {
            arr.push({name:"Day"+i,uv:data[0].rate});
          }

          let ind=arr.findIndex((obj => obj.name === 'Day10'));
          arr[ind].Currentrate=data[0].Currentrate;
         
        }).catch(e=>{
            console.log(e);
        })

    },[]);
            

  return (
   <div>
{/* //   hello
//   {
// data.map(item => {
//     return(
//         <h4>{item.Days}</h4>
//     )
// })    
//   } */}

     </div>
  )
}

export default apitest
