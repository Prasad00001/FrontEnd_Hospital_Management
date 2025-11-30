import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import hospitalService from '../../services/api/hospital.service';
// Ensure these paths are correct relative to this file
import Input from '../common/Input';
import Button from '../common/Button';

const HospitalRegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (formData.adminPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Call the API
      const response = await hospitalService.register(formData);
      
      // Success Message
      alert(`Registration Successful! \nYour Hospital ID is: ${response.data.tenantId}\nPlease save this ID for login.`);
      
      // Redirect to Login
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700 font-medium text-sm">{error}</p>
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
        placeholder="e.g. Apollo Hospital"
        required
      />

      <Input
        label="Address Line 1"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        placeholder="Building No, Street Name"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Pune"
          required
        />
        <Input
          label="Contact No (+91)"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="9876543210"
          type="tel"
          required
        />
      </div>

      <div className="border-b pb-2 mb-4 mt-6">
        <h3 className="text-lg font-medium text-gray-900">Admin Account</h3>
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