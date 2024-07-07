import React, { useEffect, useState } from 'react';
import { getSentEmails, getVendorEmails, sendEmailToVendors } from '../services/api';

function SentEmailsList() {
  const [sentEmails, setSentEmails] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [vendorEmails, setVendorEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const adminEmail = localStorage.getItem('adminMail');

  useEffect(() => {
    getSentEmails(adminEmail)
      .then(response => setSentEmails(response))
      .catch(error => console.error('Error:', error));
  }, [modalIsOpen]);

  const openModal = () => {
    getVendorEmails(adminEmail)
      .then(response => {
        setVendorEmails(response.data);
        setModalIsOpen(true);
      })
      .catch(error => console.error('Error:', error));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSendEmails = () => {
    sendEmailToVendors(selectedEmails, adminEmail)
      .then(() => {
        closeModal();
        alert('Emails sent successfully!');

      })
      .catch(error => console.error('Error:', error));
  };

  const handleChipClick = (email) => {
    setSelectedEmails((prev) => [...prev, email]);
  };

  const handleChipDelete = (email) => {
    setSelectedEmails((prev) => prev.filter((e) => e !== email));
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4">Sent Emails</h2>
      <div className='container shadow-md shadow-blue-300 p-5 flex-col gap-2'>
        {sentEmails?.map((obj, index) => (
          <div key={index} className="p-2 border-b flex flex-row gap-2 border-b-1 border-black bg-green-100 rounded-md">
            <p className='text-orange-500'>{obj.email}</p>:<p>{obj.message}</p>
          </div>
        ))}
      </div>
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Send Emails
      </button>

      {modalIsOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl mb-4">Select Vendor Emails</h2>
              <div className="m-2 border-2 border-black shadow-md p-5 rounded-md">
                {vendorEmails.map((email, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                    onClick={() => handleChipClick(email)}
                  >
                    {email}
                  </span>
                ))}
              </div>
              
              <div className="m-2 border-2 border-blue-400 shadow-md p-5 rounded-md">
                <h2 className='text-green-500 mb-5'>Selected Mails</h2>
                <div>
                  {selectedEmails.map((email, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2"
                    >
                      {email}
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => handleChipDelete(email)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSendEmails} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Send Emails
                </button>
                <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SentEmailsList;
