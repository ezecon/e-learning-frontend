import React from 'react';

export default function TeacherCard({teacher}){
  return (
    <div className="text-center">
      <img src={teacher.photo || 'https://via.placeholder.com/150'} alt={teacher.name} className="w-36 h-36 rounded-full mx-auto object-cover" />
      <h4 className="mt-2 font-semibold">{teacher.name}</h4>
      <p className="text-sm text-gray-600">{teacher.title}</p>
    </div>
  );
}