import React, { useState, useEffect } from 'react';
import { createEmployee ,updateEmployee} from '../services/api';

function CreateEmployeeForm({ onSuccess, initialData }) {
  const [employee, setEmployee] = useState({
    name: '',
    designation: '',
    ctc: '',
    email: '',
  });

  useEffect(() => {
    if (initialData) {
      setEmployee(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateEmployee(employee.email,employee)
        .then(onSuccess)
        .catch(error => console.error('Error:', error));
    } else {
      createEmployee(employee)
        .then(onSuccess)
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-5'>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Designation</label>
        <input
          type="text"
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">CTC</label>
        <input
          type="number"
          name="ctc"
          value={employee.ctc}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          readOnly={!!initialData} // Make email read-only when editing
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default CreateEmployeeForm;
