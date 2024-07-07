import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4">Welcome to Credmarg</h2>
      <p>Manage your employees and vendors with ease.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div
          className="bg-blue-500 text-white p-6 rounded shadow-md cursor-pointer"
          onClick={() => handleNavigation('/empList')}
        >
          <h3 className="text-xl">Employee Management</h3>
          <p>View and manage your employees</p>
        </div>
        <div
          className="bg-green-500 text-white p-6 rounded shadow-md cursor-pointer"
          onClick={() => handleNavigation('/vndrlist')}
        >
          <h3 className="text-xl">Vendor Management</h3>
          <p>View and manage your vendors</p>
        </div>
        <div
          className="bg-yellow-500 text-white p-6 rounded shadow-md cursor-pointer"
          onClick={() => handleNavigation('/sentmails')}
        >
          <h3 className="text-xl">Mails</h3>
          <p>View sent emails to vendors</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
