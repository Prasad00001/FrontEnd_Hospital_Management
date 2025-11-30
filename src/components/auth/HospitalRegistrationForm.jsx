import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import hospitalService from '../../services/api/hospital.service';
import Input from '../common/Input';
import Button from '../common/Button';

const HospitalRegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Updated state for Indian address structure
  const [formData, setFormData] = useState({
    hospitalName: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    contactNumber: '',
    adminEmail: '',
    adminPassword: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.adminPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Basic Indian Phone Validation (10 digits)
    if (formData.contactNumber.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      // Combine address parts for backend if needed, or send as is
      const payload = {
        ...formData,
        fullAddress: `${formData.addressLine1}, ${formData.city}, ${formData.state} - ${formData.pincode}`
      };

      await hospitalService.register(payload);
      
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-medium text-gray-900">Hospital Details</h3>
      </div>

      <Input
        label="Hospital Name"
        name="hospitalName"
        value={formData.hospitalName}
        onChange={handleChange}
        placeholder="e.g. Apollo Hospital / Sahyadri Hospital"
        required
      />

      <Input
        label="Address Line 1"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        placeholder="Building No, Street Name, Area"
        required
      />

      {/* Row for City and State */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Pune"
          required
        />
        
        {/* In a real app, this should be a dropdown of Indian States */}
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="e.g. Maharashtra"
          required
        />
      </div>

      {/* Row for Pincode and Phone */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="411057"
          required
          type="number"
        />
        <Input
          label="Contact Number (+91)"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="98765 43210"
          required
          type="tel"
        />
      </div>

      <div className="border-b pb-2 mb-4 mt-6">
        <h3 className="text-lg font-medium text-gray-900">Admin Account (HOD/Dean)</h3>
      </div>

      <Input
        label="Admin Email"
        name="adminEmail"
        type="email"
        value={formData.adminEmail}
        onChange={handleChange}
        placeholder="admin@hospital.com"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Password"
          name="adminPassword"
          type="password"
          value={formData.adminPassword}
          onChange={handleChange}
          required
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="pt-4">
        <Button type="submit" fullWidth isLoading={loading}>
          Register Hospital
        </Button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default HospitalRegistrationForm;