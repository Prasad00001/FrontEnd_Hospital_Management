import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    hospitalId: '', // Critical for Multi-tenancy
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass hospitalId to the context login function
      const user = await login(formData.email, formData.password, formData.hospitalId);
      
      // ROLE-BASED REDIRECTION
      switch(user.role) {
        case 'admin':
          navigate('/dashboard/admin'); // Hospital Admin
          break;
        case 'doctor':
          navigate('/dashboard/doctor');
          break;
        case 'nurse':
          navigate('/dashboard/nurse');
          break;
        case 'receptionist':
          navigate('/dashboard/receptionist');
          break;
        case 'pharmacist':
          navigate('/dashboard/pharmacist');
          break;
        case 'lab_tech':
          navigate('/dashboard/lab');
          break;
        default:
          navigate('/dashboard'); // Fallback
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Hospital ID Field - REQUIRED for backend to know which DB to check */}
      <Input
        label="Hospital ID"
        name="hospitalId"
        value={formData.hospitalId}
        onChange={handleChange}
        placeholder="e.g. apollo-pune-123"
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="user@hospital.com"
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" fullWidth isLoading={loading}>
        Sign in
      </Button>

      <div className="mt-4 text-center border-t pt-4">
        <p className="text-sm text-gray-600">
          New Hospital Organization?{' '}
          <Link to="/hospital-onboarding" className="font-medium text-blue-600 hover:text-blue-500">
            Register Here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;