import {Button} from "@material-tailwind/react"
import axios from "axios";
import toast from "react-hot-toast";

export default function CourseCard({data}) {
  const {id , title, fee, short_desc, seats, duration} =data;

  const handleDelete = async (id)=>{
    try{
      const res = await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`)
      if(res.status===200){
        toast.success("Course Deleted")
      }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="text-green-500 shadow-lg w-full rounded-xl border">
      <div className="w-full object-cover p-5">
        <img
          src={short_desc}
          alt="Course"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="text-green-500 flex flex-wrap gap-2 text-xs sm:text-sm montserrat-alternates justify-center py-2 underline-offset-4">
        <p className="border rounded-lg p-1 bg-[#00000013]">Total Seat - {seats}</p>
        <p className="border rounded-lg p-1 bg-[#00000013]">Duration - {duration}</p>

      </div>
      <hr />
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-center py-5">
          {title}
        </h1>
        <p className="text-[] text-center text-xs sm:text-sm md:text-base lg:text-lg px-8">
                ৳{fee} 
        </p>
      </div>
      <hr/>
      <div className="flex justify-between p-3">
        <Button className="text-green-500 bg-white border border-green-500">Update</Button>
        <Button className="bg-green-500 text-white" onClick={()=>handleDelete((id))}>Delete</Button>
      </div>
    </div>
  );
}
