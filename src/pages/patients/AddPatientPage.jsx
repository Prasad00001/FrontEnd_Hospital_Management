import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patientService from '../../services/api/patient.service';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { ArrowLeft, Save } from 'lucide-react';

const AddPatientPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    guardianName: '', // Important in India (Father/Husband)
    age: '',
    gender: 'Male',
    bloodGroup: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    symptoms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await patientService.createPatient(formData);
      alert('Patient Registered Successfully! UHID generated.');
      navigate('/dashboard/receptionist'); // Go back to dashboard
    } catch (error) {
      alert('Error registering patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">New Patient Registration</h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Personal Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="e.g. Rahul" />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="e.g. Sharma" />
              <Input label="Guardian Name (Father/Husband)" name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="e.g. Ramesh Sharma" />
              
              <div className="flex gap-4">
                <Input label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required placeholder="25" />
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Blood Group</label>
                <select 
                  name="bloodGroup" 
                  value={formData.bloodGroup} 
                  onChange={handleChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Contact & Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Mobile Number (+91)" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="9876543210" />
              <Input label="Email (Optional)" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="rahul@example.com" />
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Input label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Flat No, Building, Street Area" />
              </div>
              <Input label="City" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Pune" />
              <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="411001" />
            </div>
          </div>

          {/* Section 3: Initial Assessment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Medical Assessment</h3>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Chief Complaints / Symptoms</label>
              <textarea 
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe current symptoms (e.g. High fever, body pain since 2 days)"
              ></textarea>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading}>
              <Save size={18} className="mr-2 inline" /> Register Patient
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPatientPage;