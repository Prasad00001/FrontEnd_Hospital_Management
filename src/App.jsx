import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Auth
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import HospitalOnboarding from './pages/auth/HospitalOnboarding';
import ForgotPassword from './pages/auth/ForgotPassword';
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
import CreatePrescription from './pages/prescriptions/CreatePrescriptionPage';
import PatientsListPage from './pages/patients/PatientsListPage';
import UserManagement from './pages/admin/UserManagement';
import TestQueue from './pages/lab/TestQueue';
import PharmacyQueue from './pages/pharmacy/PharmacyQueue';
import VitalsEntry from './pages/nurse/VitalsEntry';
import Inventory from './pages/pharmacy/Inventory';
import BookAppointment from './pages/appointments/BookAppointment';
import AdmitPatient from './pages/nurse/AdmitPatient';

// ADMIN PAGES
import DoctorsList from './pages/admin/DoctorsList';
import Settings from './pages/admin/Settings';

// DOCTOR PAGES
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import PrescriptionList from './pages/doctor/PrescriptionList';

// RECEPTIONIST PAGES
import EmergencyDashboard from './pages/receptionist/EmergencyDashboard';

// LAB PAGES
import LabReports from './pages/lab/LabReports';

// COMMON PAGES
import UserProfile from './pages/common/UserProfile'; // <-- NEW
import PatientDetails from './pages/patients/PatientDetails'; // <-- NEW

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/hospital-onboarding" element={<HospitalOnboarding />} />

      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Navigate to="doctor" replace />} />
        
        {/* 1. ADMIN ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['admin']} />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="staff" element={<UserManagement />} />
          <Route path="doctors" element={<DoctorsList />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 2. DOCTOR ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['doctor', 'admin']} />}>
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="doctor/appointments" element={<DoctorAppointments />} />
          <Route path="doctor/prescriptions" element={<PrescriptionList />} />
          <Route path="prescription/create" element={<CreatePrescription />} />
        </Route>

        {/* 3. NURSE ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['nurse', 'admin']} />}>
          <Route path="nurse" element={<NurseDashboard />} />
          <Route path="vitals" element={<VitalsEntry />} />
          <Route path="admissions" element={<AdmitPatient />} />
        </Route>

        {/* 4. RECEPTIONIST ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['receptionist', 'admin']} />}>
          <Route path="receptionist" element={<ReceptionistDashboard />} />
          <Route path="patient/add" element={<AddPatientPage />} />
          <Route path="appointments" element={<BookAppointment />} />
          <Route path="emergency" element={<EmergencyDashboard />} />
        </Route>

        {/* 5. PHARMACIST ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['pharmacist', 'admin']} />}>
          <Route path="pharmacist" element={<PharmacistDashboard />} />
          <Route path="pharmacy/prescriptions" element={<PharmacyQueue />} />
          <Route path="pharmacy/inventory" element={<Inventory />} />
        </Route>

        {/* 6. LAB TECHNICIAN ROUTES */}
        <Route element={<RoleBasedRoutes allowedRoles={['lab_tech', 'admin']} />}>
          <Route path="lab" element={<LabDashboard />} />
          <Route path="lab/tests" element={<TestQueue />} />
          <Route path="lab/reports" element={<LabReports />} />
        </Route>

        {/* SHARED / COMMON ROUTES */}
        <Route path="patients" element={<PatientsListPage />} />
        <Route path="patients/:id" element={<PatientDetails />} /> {/* <-- NEW ROUTE */}
        <Route path="profile" element={<UserProfile />} />         {/* <-- UPDATED */}

      </Route>

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