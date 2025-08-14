import { Avatar, Button, Drawer, IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {useToken} from "../Hook/useToken";
import axios from "axios";

export default function Nav() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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
            setUserInfo(response.data.data);
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

  const handleLogout = () => {
    removeToken();
    setUserID(null);
    setUserInfo(null);
    navigate('/login');
  };

  useEffect(() => {
    const smMediaQuery = window.matchMedia('(max-width: 640px)');
    setIsSmallScreen(smMediaQuery.matches);

    const handleScreenChange = (e) => setIsSmallScreen(e.matches);
    smMediaQuery.addEventListener('change', handleScreenChange);

    return () => smMediaQuery.removeEventListener('change', handleScreenChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openDrawerRight = () => setOpenRight(true);

  return (
    <header className={`px-10 bebas-neue w-full rounded-xl ${isLoading ? '' : ''}`}>
      {/* Left Side */}
      {isSmallScreen ? (
        <CgDetailsMore onClick={openDrawerRight} className="avatar text-white text-2xl cursor-pointer" />
      ) : (
        <nav className={`navbar`}>
          <Link to=""><p>Home</p></Link>
          <Link to="gallery"><p>Gallery</p></Link>
          <Link to="teachers"><p>Teachers</p></Link>
          <Link to="contact"><p>Contact</p></Link>
          <Link to="about"><p>About</p></Link>
        </nav>
      )}

      {/* Center Logo */}
      <div className='logo-container'>
        <img className='logo rounded-full' src="/1.jpg" alt="logo" />
      </div>

      {/* Right Side */}
    {isSmallScreen ? (
  userID ? (
    <nav className='navbar'>
      <Menu>
                <MenuHandler>
                 <Avatar
                  className="avatar"
                  src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                  withBorder={true}
                  color="green"
                  alt="avatar"
                />
                </MenuHandler>
                <MenuList>
                  <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
      
    </nav>
  ) : (
    <nav className='navbar'>
      
      <Link to="/login">
        <Button className="bg-green-500">Login</Button>
      </Link>
    </nav>
  )
) : (
  userID ? (
    <nav className='navbar'>
    <Link to="courses">
      <p className="cursor-pointer flex gap-1 bg-[#d0d5dd] text-black rounded-lg p-3">
        All Courses <IoIosArrowUp />
      </p>
    </Link>
    <Link to="dashboard">
      <p className="cursor-pointer flex gap-1 bg-black text-white rounded-lg p-3">
        Dashboard <MdOutlineDashboard className="text-lg" />
      </p>
    </Link>
    <Menu>
                <MenuHandler>
                 <Avatar
                  className="avatar cursor-pointer"
                  src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                  withBorder={true}
                  color="green"
                  alt="avatar"
                />
                </MenuHandler>
                <MenuList>
                  <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
  </nav>
  ) : (
    <nav className='navbar'>
      <Link to="/login">
        <Button className="bg-green-500">Login</Button>
      </Link>
    </nav>
  )
  
)}


      {/* Drawer */}
      <Drawer
        placement="left"
        open={openRight}
        onClose={() => setOpenRight(false)}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <IconButton variant="text" color="blue-gray" onClick={() => setOpenRight(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        {userID ? (
  <div className="flex flex-col gap-6 h-full p-4 bg-gradient-to-b from-green-50 to-white rounded-xl shadow-lg">
    {/* Profile Section */}
    <div className="flex flex-col items-center gap-2 py-4 border-b border-gray-200">
      <Link to="/profile">
        <Avatar
          src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
          className="border-2 border-green-600 shadow-md"
          size="lg"
        />
      </Link>
      <h1 className="montserrat-alternates-bold text-lg text-green-700">
        {userInfo?.name || "User Name"}
      </h1>
      <p className="text-sm text-gray-500">Welcome Back!</p>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col gap-3 bg-green-50 p-4 rounded-lg shadow-inner">
      <Link to="/dashboard">
        <p className="text-green-700 font-medium hover:text-green-900 transition-colors duration-200 cursor-pointer">
          Dashboard
        </p>
      </Link>
      <Link to="/courses">
        <p className="text-green-700 font-medium hover:text-green-900 transition-colors duration-200 cursor-pointer">
          All Courses
        </p>
      </Link>
    </div>

    {/* Main Navigation */}
    <div className="flex flex-col gap-2 mt-4">
      <Link to="">
        <p className="text-gray-700 font-medium hover:text-green-700 transition-colors duration-200 cursor-pointer">
          Home
        </p>
      </Link>
      <Link to="gallery">
        <p className="text-gray-700 font-medium hover:text-green-700 transition-colors duration-200 cursor-pointer">
          Gallery
        </p>
      </Link>
      <Link to="teachers">
        <p className="text-gray-700 font-medium hover:text-green-700 transition-colors duration-200 cursor-pointer">
          Teachers
        </p>
      </Link>
      <Link to="contact">
        <p className="text-gray-700 font-medium hover:text-green-700 transition-colors duration-200 cursor-pointer">
          Contact
        </p>
      </Link>
      <Link to="about">
        <p className="text-gray-700 font-medium hover:text-green-700 transition-colors duration-200 cursor-pointer">
          About
        </p>
      </Link>
    </div>
  </div>
) : (
  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
    <Link to="/login">
      <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200">
        Login
      </Button>
    </Link>
  </div>
)}

      </Drawer>
    </header>
  );
}
