import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";

export default function CoursesDetails(){
const [courses, setCourses] = useState([]);
const navigate = useNavigate();
  useEffect(()=>{
    const fetchCourses = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/courses?page=1');
      if(response.status === 200){
        setCourses(response.data.data);
        console.log(response.data.data);
      }
    };
    fetchCourses();
  }, []);
const handleNavigate = (courseId) => {
  // Navigate to the course details page
  navigate(`/courses/${courseId}`);
};
  return (
   <div>
    <section className="montserrat-alternates container mx-auto py-12">
        <h2 className="text-4xl font-semibold mb-6 text-center">Our Courses</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <img src={course.short_desc} alt={course.title} />
              </div>
              <div className="p-4">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Bestseller
                </span>
                <h3 className="mt-2 font-semibold text-lg leading-snug">
                  {course.title}
                </h3>
                  <div className="flex justify-between my-5">
                    <div className="mt-2 font-semibold">Tk.{course.fee}</div>
                    <Button onClick={() => handleNavigate(course.slug)}>Buy Now</Button>
                  </div>
                
              </div>
            </div>
          ))}
        </div>
       
      </section>
   </div>
  );
}