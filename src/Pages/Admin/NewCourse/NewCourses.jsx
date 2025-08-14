import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewCourses() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_desc: "",
    long_desc: "",
    fee: "",
    duration: "",
    seats: "",
    teachers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/courses`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Course Added Successfully!");
        setFormData({
          title: "",
          slug: "",
          short_desc: "",
          long_desc: "",
          fee: "",
          duration: "",
          seats: "",
          teachers: "",
        });
      }
    } catch (error) {
      console.error(error);
      
      console.log(error.response?.data);
      toast.error("Failed to add course!");
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-green-500 montserrat-alternates p-5 text-xl">
        Add New Course
      </h1>
      <form className="grid gap-4 justify-center items-center">
        <div className="w-72">
          <Input
            type="text"
            name="title"
            label="Course Title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className="w-72">
          <Input
            type="text"
            name="slug"
            label="Slug"
            onChange={handleChange}
            value={formData.slug}
          />
        </div>
        <div className="w-72">
          <Input
            type="text"
            name="short_desc"
            label="Image URL"
            onChange={handleChange}
            value={formData.short_desc}
          />
        </div>
        <div className="w-72">
          <Textarea
            name="long_desc"
            label="Course Description"
            onChange={handleChange}
            value={formData.long_desc}
          />
        </div>
        <div className="w-72">
          <Input
            type="number"
            name="fee"
            min={0}
            label="Fee"
            onChange={handleChange}
            value={formData.fee}
          />
        </div>
        <div className="w-72">
          <Input
            type="text"
            name="duration"
            label="Duration (e.g. 3 months)"
            onChange={handleChange}
            value={formData.duration}
          />
        </div>
        <div className="w-72">
          <Input
            type="number"
            name="seats"
            min={1}
            label="Seats Available"
            onChange={handleChange}
            value={formData.seats}
          />
        </div>
        <div>
          <Button  onClick={handleRegister}>Add Course</Button>
        </div>
      </form>
    </div>
  );
}
