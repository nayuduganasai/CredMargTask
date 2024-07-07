import React, { useEffect, useState } from 'react';
import api, { deleteEmployee, getAllEmployees } from '../services/api';
import CreateEmployeeForm from './createEmployeeForm';
import { FaEdit, FaRegTimesCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    getAllEmployees()
      .then(response => setEmployees(response))
      .catch(error => console.error('Error:', error));
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteEmployee = (email) => {
    deleteEmployee(email)
      .then(() => fetchEmployees())
      .catch(error => console.error('Error:', error));
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    fetchEmployees();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">Employees</h2>
      <button 
        onClick={handleAddEmployee} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Add Employee
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Designation</th>
              <th className="py-2 px-4 border-b">CTC</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {employees?.map(employee => (
              <tr key={employee.email} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.designation}</td>
                <td className="py-2 px-4 border-b">{employee.ctc}</td>
                <td className="py-2 px-4 border-b">{employee.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button 
                    onClick={() => handleEditEmployee(employee)} 
                    className="mr-2 text-blue-500 hover:text-blue-600 transition-colors duration-150"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteEmployee(employee.email)} 
                    className="text-red-500 hover:text-red-600 transition-colors duration-150"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
            <div className='flex flex-row-reverse'>
              <FaRegTimesCircle 
                onClick={() => setShowModal(false)} 
                className=" w-5 h-5 cursor-pointer"
              />
            </div>
            <CreateEmployeeForm 
              onSuccess={handleFormSuccess} 
              initialData={selectedEmployee} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
