import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../Components/Hook/useToken";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

export default function Profile() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [student, setUserInfo] = useState(null);

  // Verify token and set user ID
useEffect(() => {
  const verifyToken = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        'http://localhost:8000/api/token-verify',
        {}, 
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200 ) {
        setUserID(response.data.student_id);
        console.log(response.data.student_id);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  if (token) {
    verifyToken();
  }
}, [token]);


  // Fetch user info when userID changes
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:8000/api/students/search/${userID}`);
          if (response.status === 200) {
            setUserInfo(response.data);
            console.log(response.data);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    fetchUserInfo();
  }, [userID]);

  if (!student) return <p className="text-center mt-10">Loading</p>;
const handleResetPassword = async () => {
  try {
      const res = await axios.post("http://127.0.0.1:8000/api/sent-otp", { student_id: student.student_id, email: student.email });
      if (res.status === 200 || res.status === 201) {
        toast.success("OTP Sent Successfully!");
        navigate("/change-password")
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to add student!");
    }
};
return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-pink-100 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="montserrat-alternates flex flex-col items-center bg-gradient-to-r from-green-500 to-white text-white p-8">
          <img
            src={student.photo || "https://via.placeholder.com/150"}
            alt={student.name}
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover mb-4"
          />
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <p className="text-lg mt-1 opacity-90">ID: {student.student_id}</p>
        </div>

        {/* Info Grid */}
        <div className="montserrat-alternates p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Father's Name" value={student.father_name} />
          <InfoCard title="Mother's Name" value={student.mother_name} />
          <InfoCard title="Age" value={student.age} />
          <InfoCard title="Gender" value={student.gender} />
          <InfoCard title="Nationality" value={student.is_bangladeshi ? "Bangladeshi" : "Other"} />
          <InfoCard title="Religion" value={student.religion} />
          <InfoCard title="Admission Date" value={student.admission_date} />
          <InfoCard title="Passing Year" value={student.passing_year} />
          <InfoCard title="Birth Date" value={student.birth_date} />
          <InfoCard title="Course" value={student.course_id} courseId={student.course_id} />
        </div>
        
      </div>
        <div className="flex justify-center items-center py-5">
            <Button onClick={handleResetPassword}>Change Password</Button>
        </div>
    </div>
  );
}

function InfoCard({ title, value, courseId }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/courses")
      .then((res) => {
        setCourses(res.data.data || []);
      })
      .catch((err) => console.error("Failed to fetch courses", err));
  }, []);

  const filteredCourses = courses.filter(course => course.id === courseId);
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>

      {title === "Course" ? (
        courses.length > 0 ? (
          filteredCourses.map((course) => (
              <li key={`${course.id}`} value={course.id}>
                {course.title}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No courses available</p>
          )
      ) : (
        <p className="text-gray-900 font-medium">{value || "N/A"}</p>
      )}
    </div>
  );
}

