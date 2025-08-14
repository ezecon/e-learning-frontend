import { Input, Textarea, Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    bio: "",
    courses: [],
  });

  const [courseList, setCourseList] = useState([]);

  // Fetch courses for multi-select
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses")
      .then(res => setCourseList(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseSelect = (courseId) => {
    setFormData((prev) => {
      if (prev.courses.includes(courseId)) {
        // remove if already selected
        return { ...prev, courses: prev.courses.filter(id => id !== courseId) };
      } else {
        // add course
        return { ...prev, courses: [...prev.courses, courseId] };
      }
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/teachers", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Teacher Added Successfully");
        setFormData({ name: "", photo: "", bio: "", courses: [] });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add teacher");
    }
  };

  return (
    <div className=" montserrat-alternates mt-10 flex flex-col items-center">
      <h1 className=" text-green-500 text-xl font-bold text-goldenrod mb-5">Add Teacher</h1>

      <div className="grid gap-4 w-80">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Photo URL" name="photo" value={formData.photo} onChange={handleChange} />
        <Textarea label="Bio" name="bio" value={formData.bio} onChange={handleChange} />

        <div>
          <label className="block mb-2 font-medium">Select Courses</label>
          <div className="flex flex-col gap-2 border p-2 rounded">
            {courseList.map((course) => (
              <label key={course.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={course.id}
                  checked={formData.courses.includes(course.id)}
                  onChange={() => handleCourseSelect(course.id)}
                />
                {course.title}
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Add Teacher
        </button>
      </div>
    </div>
  );
}
