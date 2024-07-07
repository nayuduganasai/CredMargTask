import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/admin',
  maxRedirects: 0,
});

// Interceptor to add the JWT token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API methods

export const createEmployee = async (employee) => {
  console.log(employee);
  const response = await api.post(`/employees?adminEmail=${localStorage.getItem('adminMail')}`, employee);
  return response.data;
};

export const updateEmployee = async (email, employee) => {
  const response = await api.put(`/employee?email=${email}`, employee);
  return response.data;
};

export const deleteEmployee = async (email) => {
  await api.delete(`/employees?email=${email}`);
};

export const getAllEmployees = async () => {
  const response = await api.get(`/employees?adminMail=${localStorage.getItem('adminMail')}`);
  return response.data;
};

export const createVendor = async (vendor) => {
  const response = await api.post(`/vendors?adminEmail=${localStorage.getItem('adminMail')}`, vendor);
  return response.data;
};

export const updateVendor = async (email, vendor) => {
  const response = await api.put(`/vendors?email=${email}`, vendor);
  return response.data;
};

export const deleteVendor = async (email) => {
  await api.delete(`/vendors?email=${email}`);
};

export const getAllVendors = async () => {
  const response = await api.get(`/vendors?adminMail=${localStorage.getItem('adminMail')}`);
  return response.data;
};

export const sendEmailToVendors = async (vendorEmails,adminEmail) => {
  const response = await api.post(`/vendors/send-email?adminMail=${adminEmail}`, vendorEmails);
  return response.data;
};

export const getVendorEmails = (adminEmail) => {
  return api.get(`/vendors/emails?adminEmail=${adminEmail}`);
};

export const getSentEmails = async (adminEmail) => {
  const response = await api.get(`/sent-emails?adminMail=${adminEmail}`);
  return response.data;
};

export const registerAdmin = async (admin) => {
  const response = await api.post('/register', admin);
  return response.data;
};

export const authenticateAdmin = async (authRequest) => {
  try {
    const response = await axios.post('http://localhost:8080/api/authenticate', authRequest);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
};

export default api;
