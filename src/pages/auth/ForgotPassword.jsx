import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call logic here
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Check your email</h3>
        <p className="mt-2 text-sm text-gray-500">
          We have sent a password reset link to <b>{email}</b>.
        </p>
        <div className="mt-6">
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Back to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your registered email"
        required
      />
      <Button type="submit" fullWidth>Send Reset Link</Button>
      <div className="text-center mt-4">
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 text-sm">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

const ForgotPassword = () => {
  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive instructions">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;