import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

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
      const user = await login(formData.email, formData.password);
      
      // INTELLIGENT ROUTING: Send user to their specific dashboard
      switch(user.role) {
        case 'admin':
          navigate('/dashboard/admin');
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
        case 'lab_tech':
          navigate('/dashboard/lab'); // We can build this later
          break;
        default:
          navigate('/dashboard/doctor'); // Fallback
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="role@hospital.com" // Hint to user
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Any password works for demo"
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