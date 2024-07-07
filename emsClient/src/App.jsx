import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar';
import Home from './pages/index';
import EmployeeList from './components/employeeList';
import VendorList from './components/vendorList';
import SentEmailsList from './components/sentEmailsList';
import './App.css'
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {

  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <div className='h-full flex flex-col'>
        <div className='w-full'>
          <Navbar />
        </div>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Home />}/>
              <Route path="empList" element={<EmployeeList />} />
              <Route path="vndrlist" element={<VendorList />} />
              <Route path="sentmails" element={<SentEmailsList />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App



