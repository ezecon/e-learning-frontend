import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const texts = ["Hang on!", "Just Login"];

export default function Login() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  //loggin
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      student_id: id,
      password: password, 
    };
    try {
      const response = await axios.post('http://localhost:8000/api/login', user);
      
      if (response.data.error) {
        toast.error(response.data.error); // Display error message
      } else {
        toast.success("Login successful!");
        localStorage.setItem('token', response.data.token); 
        console.log("Token:", response.data.token);
        navigate('/')
        
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display specific backend error message
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-none montserrat-alternates-regular">

      <div className="relative flex flex-col items-center justify-center p-4 pt-36">

        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-white bg-opacity-10">
          <h1 className="text-2xl text-black font-bold mb-6 text-center">Login Form</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
             
              <Input
              label="Enter ID" 
                type="text" 
                id="id"
                placeholder="Enter  ID" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              
              <Input
              label="Enter Password" 
                type="password" 
                id="password"
                placeholder="Enter Password" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
