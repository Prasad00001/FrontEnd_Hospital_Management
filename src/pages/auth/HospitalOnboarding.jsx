import React from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import HospitalRegistrationForm from '../../components/auth/HospitalRegistrationForm';

const HospitalOnboarding = () => {
  return (
    <AuthLayout 
      title="Register your Hospital"
      subtitle="Create a new workspace for your organization"
    >
      <HospitalRegistrationForm />
    </AuthLayout>
  );
};

export default HospitalOnboarding;