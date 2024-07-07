import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createVendor, updateVendor } from '../services/api';

const VendorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  upi: Yup.string().required('UPI is required'),
});

function CreateVendorForm({ onSuccess, initialData }) {
  return (
    <Formik
      initialValues={initialData || { name: '', email: '', upi: '' }}
      validationSchema={VendorSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const apiCall = initialData
          ? updateVendor(values.email,values)
          : createVendor(values);

        apiCall.then(() => {
          resetForm();
          onSuccess();
        })
          .catch(error => console.error('Error:', error))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-6">
          <h2 className="text-2xl mb-4">{initialData ? 'Edit Vendor' : 'Create Vendor'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <Field name="name" className="w-full p-2 border rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <Field name="email" type="email" className="w-full p-2 border rounded" readOnly={!!initialData} />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">UPI</label>
            <Field name="upi" className="w-full p-2 border rounded" />
            <ErrorMessage name="upi" component="div" className="text-red-500 text-sm" />
          </div>
          <div className='flex flex-row-reverse'>
          <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded">
            {isSubmitting ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Vendor' : 'Create Vendor')}
          </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateVendorForm;
