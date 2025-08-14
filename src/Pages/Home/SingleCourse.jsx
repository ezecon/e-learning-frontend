import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";

export default function SingleCourse() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState([]);
  const {slug} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    whatsappNumber: '',
    email: '',
    address: '',
  });
  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/single-course/${slug}`);
        if (res.status === 200) {
          setInfo(res.data); 
          console.log(res.data);
          console.log(slug)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchInfo();
  }, [slug]); 
  


  const handleRegister = async () => {
    const data = {
      name: formData.fullName,
      number: formData.number,
      wNumber: formData.whatsappNumber,
      email: formData.email,
      address: formData.address,
      course: info.name,
    };
  
    try {
      const res = await axios.post(`https://dot-it-server.vercel.app/api/course-purchases`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (res.status === 200) {
        // Successful registration
        toast.success("Registration Completed!");
        handleOpen(); // Close the dialog after successful registration
        navigate('/confirmation', {
          state: { email: formData.email }
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle specific error code from backend (e.g., duplicate email)
        toast.error("Email already in use. Please use a different email.");
        handleOpen();
      } else {
        // Handle general errors
        console.error(error);
        toast.error("Registration Failed. Please try again.");
      }
    }
    
  };



  return (
    <div className="mx-auto max-w-screen-xl container  px-4 py-8">
      <div className="gap-8 items-center">
        <div>
          <div className="pl-5 text-green-500 text-center montserrat-alternates">
           
             <div className="p-3">
          <img
            className="rounded-xl shadow-lg hover:scale-95 transition-transform duration-500 w-full h-auto"
            src={info?.short_desc}
            alt="Course Preview"
          />
        </div>
         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {info?info.title :<p>Loading</p>}
            </h1>
            <p className="text-sm text-[#00000088] mb-6">
            {info?info.long_desc :<p>Loading</p>}
            </p>

        <div className="text-green-500 flex flex-wrap gap-2 text-xs sm:text-sm montserrat-alternates justify-center py-4">
            <p className="border rounded-lg p-1 bg-[#00000013]">Total Seat - {info?.seats}</p>
            <p className="border rounded-lg p-1 bg-[#00000013]">Duration - {info?.duration} months</p>
            <p className="border rounded-lg p-1 bg-[#00000013]">Platform - Online</p>
          </div>
            <div className=" py-10">
                 <p className="text-xs sm:text-sm md:text-base lg:text-lg px-8 mb-5">
                ৳{info?.fee} <del className="text-xs">৳{info?.oldPrice}</del>
              </p>
              <Button onClick={handleOpen} className="bg-green-500 text-white px-4 py-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg">
                PURCHASE NOW
              </Button>
             
            </div>
            <hr />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {info?.teachers?.length > 0 ? (
                info.teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
                  >
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {teacher.name}
                      </span>
                      <h3 className="mt-2 font-semibold text-lg leading-snug">
                        {teacher.bio}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No instructors available for this course.
                </p>
              )}
            </div>

          
        </div>
      </div>
      <div className="">
       
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-center flex justify-center items-center">Purchase Page</DialogHeader>
        <DialogBody className="grid grid-rows-5 gap-3 justify-center items-center">
          <div className="w-72">
            <Input type="text" name="fullName" label="Full Name" onChange={handleChange} value={formData.fullName} />
          </div>
          <div className="w-72">
            <Input type="number" name="number" min={0} label="Number" onChange={handleChange} value={formData.number} />
          </div>
          <div className="w-72">
            <Input type="number" name="whatsappNumber" min={0} label="What's App Number" onChange={handleChange} value={formData.whatsappNumber} />
          </div>
          <div className="w-72">
            <Input type="email" name="email" label="Email" onChange={handleChange} value={formData.email} />
          </div>
          <div className="w-72">
            <Input type="text" name="address" label="Address" onChange={handleChange} value={formData.address} />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center items-center">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button className="btn-31" onClick={handleRegister}>
            <span className="text-container">
              <span className="text">Register</span>
            </span>
          </button>
        </DialogFooter>
      </Dialog>
    </div>
    </div>
  );
}
