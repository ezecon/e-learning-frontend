import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../../Pages/Home/Home";
import Index from "../../Pages/Admin/Index";
import NewCourses from "../../Pages/Admin/NewCourse/NewCourses";
import AllCoursesAdmin from "../../Pages/Admin/AllCourses/AllCourses";
import NewStudent from "../../Pages/Admin/NewStudent/NewStudent";
import SearchStudent from "../../Pages/Admin/Home/Validation";
import AddTeacher from "../../Pages/Admin/AddTeacher/AddTeacher";
import { HomeAdmin } from "../../Pages/Admin/Home/Home";
import Login from "../../Pages/Home/Login";
import Profile from "../../Pages/Home/Profile";
import PasswordResetWithOTP from "../../Pages/Home/PassReset";
import CoursesDetails from "../../Pages/Home/CourseDetails";
import SingleCourse from "../../Pages/Home/SingleCourse";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"courses",
                element:<CoursesDetails/>
            },
            {
                path:"courses/:slug",
                element:<SingleCourse/>
            },
            {
                path:"profile",
                element:<Profile/>
            },
            {
                path:"change-password",
                element:<PasswordResetWithOTP/>
            },
   

        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/admin',
        element:<Index/>,
        children:[
            {
                path:'',
                element:<HomeAdmin/>
            },
            {
                path:'add-teacher',
                element:<AddTeacher/>
            },
            {
                path:'student-validation',
                element:<SearchStudent/>
            },
            {
                path:'new-course',
                element:<NewCourses/>
            },
            {
                path:'courses',
                element:<AllCoursesAdmin/>
            },
            {
                path:'add-student',
                element:<NewStudent/>
            },
        ]
    }

]);

export default router;
