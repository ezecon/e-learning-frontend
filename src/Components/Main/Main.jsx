
import Nav from "../Navbar/Nav";
import { Outlet } from "react-router-dom";


export default function Main() {

  return (
    <div>
      <div className="">
      <Nav/>
      </div>
      <div className="mx-auto  mt-10 pt-8">
      <Outlet/>
      </div>
    </div>
  );
}
