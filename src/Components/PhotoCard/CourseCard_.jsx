import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }){
  return (
    <div className="bg-white shadow rounded overflow-hidden">
       <Link to={`/courses/${course.slug}`}>
      {course.short_desc && <img src={course.short_desc} alt={course.title} className="w-full h-40 object-cover" />}
      <div className="p-4">
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm mt-2">{course.long_desc?.slice(0,120)}...</p>
       
      </div>
      </Link>
    </div>
  );
}