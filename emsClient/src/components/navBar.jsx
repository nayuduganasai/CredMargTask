import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl">Credmarg</div>
        <div className="space-x-4">
          <Link to="/vndrList" className="text-white hover:border-b-2 border-orange-400">vendors</Link>
          <Link to="/empList" className="text-white hover:border-b-2 border-orange-400">Employees</Link> 
          <Link to="/" className="text-white mr-5 hover:border-b-2 border-orange-400">Home</Link>
          {localStorage.getItem("isLoggedin") && <button className="text-white mr-5 hover:border-b-2 border-white bg-red-400 rounded-md p-2"
            onClick={() => {
               localStorage.removeItem('token');
               localStorage.removeItem("adminMail"); 
               localStorage.removeItem("isLoggedin") 
               navigate("/login");
              }
              }
          >Logout</button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
