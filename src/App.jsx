import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Auth
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import HospitalOnboarding from './pages/auth/HospitalOnboarding';
import RoleBasedRoutes from './routes/RoleBasedRoutes';

// Dashboards
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import NurseDashboard from './pages/dashboard/NurseDashboard';
import ReceptionistDashboard from './pages/dashboard/ReceptionistDashboard';
import PharmacistDashboard from './pages/dashboard/PharmacistDashboard';
import LabDashboard from './pages/dashboard/LabDashboard';

// Feature Pages
import AddPatientPage from './pages/patients/AddPatientPage';
import CreatePrescription from './pages/prescriptions/CreatePrescriptionPage'; // <--- NEW IMPORT

function App() {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/hospital-onboarding" element={<HospitalOnboarding />} />

      {/* --- PROTECTED ROUTES (Inside Main Layout) --- */}
      <Route path="/dashboard" element={<MainLayout />}>
        
        {/* Default Redirect (Optional: You can change this to 'doctor' or 'admin') */}
        <Route index element={<Navigate to="doctor" replace />} />
        
        {/* 1. ADMIN ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['admin']} />}>
          <Route path="admin" element={<AdminDashboard />} />
          {/* Add Staff / Hospital Settings routes here later */}
        </Route>

        {/* 2. DOCTOR ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['doctor', 'admin']} />}>
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="prescription/create" element={<CreatePrescription />} /> {/* <--- NEW ROUTE */}
        </Route>

        {/* 3. NURSE ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['nurse', 'admin']} />}>
          <Route path="nurse" element={<NurseDashboard />} />
          <Route path="vitals" element={<div>Vitals Page (Coming Soon)</div>} />
        </Route>

        {/* 4. RECEPTIONIST ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['receptionist', 'admin']} />}>
          <Route path="receptionist" element={<ReceptionistDashboard />} />
          <Route path="patient/add" element={<AddPatientPage />} />
        </Route>

        {/* 5. PHARMACIST ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['pharmacist', 'admin']} />}>
          <Route path="pharmacist" element={<PharmacistDashboard />} />
          <Route path="pharmacy/prescriptions" element={<div>All Prescriptions List</div>} />
          <Route path="pharmacy/inventory" element={<div>Inventory Management</div>} />
        </Route>

        {/* 6. LAB TECHNICIAN ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['lab_tech', 'admin']} />}>
          <Route path="lab" element={<LabDashboard />} />
          <Route path="lab/tests" element={<div>Pending Tests List</div>} />
        </Route>

        {/* SHARED / COMMON ROUTES */}
        {/* Accessible by anyone logged in (or you can restrict this too) */}
        <Route path="patients" element={<div>Global Patient List</div>} />
        <Route path="profile" element={<div>User Profile</div>} />

      </Route>

      {/* --- 404 PAGE --- */}
      <Route path="*" element={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
          <a href="/login" className="mt-6 text-blue-600 hover:underline">Go Back Home</a>
        </div>
      } />
    </Routes>
  );
}

export default App;