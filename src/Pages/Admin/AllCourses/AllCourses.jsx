

import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Card/CourseCard";


export default function AllCoursesAdmin() {
  const[data, setData] =useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/courses?page=1`);
  
        if (res.status === 200) {
          setData(res.data.data)
          console.log(res.data.data);
        }
      } catch (error) {
          console.log(error)
      }
    }
    fetchData();
  })
  return (
    <div className="my-20">
      <h1 className="text-center montserrat-alternates text-4xl p-4 font-bold text-green-500">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {data.map((items)=>(
        <div key={items.id}>
             <CourseCard data={items}/>
        </div>
      ))}
         
      </div>
    </div>

  )
}
