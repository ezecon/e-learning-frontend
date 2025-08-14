import { Input, Select, Option, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function NewStudent() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    photo: "",
    name: "",
    father_name: "",
    mother_name: "",
    age: "",
    gender: "",
    is_bangladeshi: false,
    religion: "",
    admission_date: "",
    passing_year: "",
    birth_date: "",
    course_id: "",
  });

  useEffect(() => {
    // Fetch courses for dropdown
    axios.get("http://127.0.0.1:8000/api/courses").then((res) => {
      setCourses(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register-student", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Student Added Successfully!");
        setFormData({
          student_id: "",
          photo: "",
          name: "",
          father_name: "",
          mother_name: "",
          age: "",
          gender: "",
          is_bangladeshi: false,
          religion: "",
          admission_date: "",
          passing_year: "",
          birth_date: "",
          course_id: "",
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to add student!");
    }
  };

  return (
    <div className="montserrat-alternates mt-10">
      <h1 className="text-center font-bold text-green-500 p-5 text-xl">
        Add New Student
      </h1>
      <form className="grid gap-4 justify-center ">
       <div className="sm:flex gap-5 border p-5 rounded-xl border-green-500">
               <div className="grid gap-4 justify-center">
          <Input name="student_id" label="Student ID" onChange={handleChange} value={formData.student_id} />
        <Input name="photo" label="Photo URL" onChange={handleChange} value={formData.photo} />
        <Input name="name" label="Name" onChange={handleChange} value={formData.name} />
        <Input name="father_name" label="Father's Name" onChange={handleChange} value={formData.father_name} />
        <Input name="mother_name" label="Mother's Name" onChange={handleChange} value={formData.mother_name} />
        <Input type="number" name="age" label="Age" onChange={handleChange} value={formData.age} />

        <Select label="Gender" name="gender" onChange={(val) => setFormData({ ...formData, gender: val })}>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
        </div>
        <div className="grid gap-4 justify-center">
          <label className="flex items-center gap-2">
          <input type="checkbox" name="is_bangladeshi" onChange={handleChange} checked={formData.is_bangladeshi} />
          Is Bangladeshi?
        </label>

        <Input name="religion" label="Religion" onChange={handleChange} value={formData.religion} />
        <Input type="date" name="admission_date" label="Admission Date" onChange={handleChange} value={formData.admission_date} />
        <Input type="number" name="passing_year" label="Passing Year" onChange={handleChange} value={formData.passing_year} />
        <Input type="date" name="birth_date" label="Birth Date" onChange={handleChange} value={formData.birth_date} />
        <Input type="date" name="course_id" label="Birth Date" onChange={handleChange} value={formData.birth_date} />

        <Select label="Course" name="course_id" onChange={(val) => setFormData({ ...formData, course_id: val })}>
          {courses.map((course) => (
            <Option key={course.id} value={course.id}>
              {course.title}
            </Option>
          ))}
        </Select>
        </div>
       </div>

        <Button  onClick={handleRegister}>Add Student</Button>
      </form>
    </div>
  );
}
