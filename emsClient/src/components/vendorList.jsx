import React, { useEffect, useState } from 'react';
import api, { deleteVendor, getAllVendors } from '../services/api';
import CreateVendorForm from './createVendorForm';
import { FaEdit, FaRegTimesCircle, FaTrash } from 'react-icons/fa';


function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    getAllVendors()
      .then(response => setVendors(response))
      .catch(error => console.error('Error:', error));
  };

  const handleAddVendor = () => {
    setSelectedVendor(null);
    setShowModal(true);
  };

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const handleDeleteVendor = (email) => {
    deleteVendor(email)
      .then(() => fetchVendors())
      .catch(error => console.error('Error:', error));
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    fetchVendors();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">Vendors</h2>
      <button 
        onClick={handleAddVendor} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Add Vendor
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">UPI</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {vendors?.map(vendor => (
              <tr key={vendor.email} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-2 px-4 border-b">{vendor.name}</td>
                <td className="py-2 px-4 border-b">{vendor.email}</td>
                <td className="py-2 px-4 border-b">{vendor.upi}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button 
                    onClick={() => handleEditVendor(vendor)} 
                    className="mr-2 text-blue-500 hover:text-blue-600 transition-colors duration-150"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteVendor(vendor.email)} 
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
                className="m-2 cursor-pointer w-5 h-5 "
              />
            </div>
            <CreateVendorForm 
              onSuccess={handleFormSuccess} 
              initialData={selectedVendor} 
            />
           
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorList;
