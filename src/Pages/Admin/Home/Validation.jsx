import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchStudent() {
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = async () => {
    if (!roll.trim()) {
      toast.error("Please enter a roll number");
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/students/search/${roll}`);
      setStudent(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Student not found");
      setStudent(null);
    }
  };

  return (
    <div className="montserrat-alternates mt-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-green-500 mb-5">Search Student by Roll</h1>

      <div className="flex gap-3">
        <Input
          type="text"
          label="Enter Roll No."
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {student && (
        <div className="mt-6 border p-5 rounded-lg w-96 shadow-lg bg-white">
          <img
            src={student.photo}
            alt={student.name}
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
          <h2 className="text-lg font-semibold text-center">{student.name}</h2>
          <p className="text-sm text-gray-600 text-center">Roll: {student.student_id}</p>
          <p className="text-sm text-gray-600 text-center">Course ID: {student.course_id}</p>
          <div className="mt-3">
            <p><strong>Father:</strong> {student.father_name}</p>
            <p><strong>Mother:</strong> {student.mother_name}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Religion:</strong> {student.religion}</p>
            <p><strong>Admission Date:</strong> {student.admission_date}</p>
            <p><strong>Passing Year:</strong> {student.passing_year}</p>
            <p><strong>Birth Date:</strong> {student.birth_date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
