import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity, 
  FileText, 
  Clock 
} from 'lucide-react';
import Button from '../../components/common/Button';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data - In real app, fetch using 'id'
  const patient = {
    id: id || 'UHID-1001',
    name: 'Rahul Sharma',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    mobile: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    address: 'Flat 402, Sunshine Apts, Kothrud, Pune',
    emergencyContact: 'Ramesh Sharma (Father) - 9876500000',
    allergies: 'Penicillin, Peanuts',
    chronicConditions: 'None',
    vitals: {
      bp: '120/80',
      pulse: '72 bpm',
      temp: '98.6°F',
      spo2: '99%',
      lastChecked: 'Today, 10:30 AM'
    }
  };

  const history = [
    { id: 1, date: '2023-11-28', type: 'OPD Visit', doctor: 'Dr. Rajesh Koothrappali', diagnosis: 'Viral Fever' },
    { id: 2, date: '2023-10-15', type: 'Lab Test', doctor: 'Dr. Priya Desai', diagnosis: 'Routine Body Checkup' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Details</h1>
          <p className="text-sm text-gray-500">UHID: <span className="font-mono font-medium text-blue-600">{patient.id}</span></p>
        </div>
        <div className="ml-auto flex gap-3">
          <Button variant="outline" onClick={() => alert('Edit Profile')}>Edit Profile</Button>
          <Button variant="primary" onClick={() => navigate('/dashboard/appointments')}>Book Appointment</Button>
        </div>
      </div>

      {/* Patient Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm">
            {patient.name.charAt(0)}
          </div>

          {/* Info Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
              <p className="text-gray-500">{patient.age} Yrs • {patient.gender} • {patient.bloodGroup}</p>
            </div>
            
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" /> {patient.mobile}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" /> Pune, MH
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
              <p className="text-xs font-bold text-red-600 uppercase mb-1">Allergies</p>
              <p className="text-sm text-red-800 font-medium">{patient.allergies}</p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase mb-1">Last Vitals</p>
              <p className="text-sm text-blue-800 font-medium">BP: {patient.vitals.bp} | SpO2: {patient.vitals.spo2}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'history', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vitals Chart Placeholder */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-blue-500" /> Recent Vitals
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Blood Pressure</p>
                  <p className="text-xl font-bold text-gray-900">{patient.vitals.bp}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Pulse Rate</p>
                  <p className="text-xl font-bold text-gray-900">{patient.vitals.pulse}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Temperature</p>
                  <p className="text-xl font-bold text-gray-900">{patient.vitals.temp}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-xs text-gray-500">SpO2</p>
                  <p className="text-xl font-bold text-gray-900">{patient.vitals.spo2}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-right">Last updated: {patient.vitals.lastChecked}</p>
            </div>

            {/* Emergency Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Emergency Contact</h3>
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <p className="font-bold text-yellow-800">{patient.emergencyContact.split(' - ')[0]}</p>
                <p className="text-yellow-700 font-mono mt-1">{patient.emergencyContact.split(' - ')[1]}</p>
              </div>
              
              <h3 className="font-bold text-gray-800 mt-6 mb-4">Chronic Conditions</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>Hypertension (Diagnosed 2021)</li>
                <li>Mild Asthma</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Visit Type</th>
                  <th className="px-6 py-4">Doctor / Dept</th>
                  <th className="px-6 py-4">Diagnosis / Notes</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" /> {visit.date}
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600">{visit.type}</td>
                    <td className="px-6 py-4">{visit.doctor}</td>
                    <td className="px-6 py-4">{visit.diagnosis}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline flex items-center gap-1">
                        <FileText size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p>No documents uploaded yet.</p>
            <Button variant="outline" className="mt-4">
              Upload Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;