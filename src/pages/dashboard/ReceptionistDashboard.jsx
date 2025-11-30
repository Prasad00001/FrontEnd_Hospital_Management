import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/dashboard/StatsCard';
import Button from '../../components/common/Button';
import { UserPlus, Calendar, Phone, Users, Search } from 'lucide-react';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'New Registrations', value: '18', icon: UserPlus, color: 'bg-green-500' },
    { title: 'Appointments Today', value: '42', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Doctors Available', value: '12', icon: Users, color: 'bg-purple-500' },
  ];

  const todayAppointments = [
    { id: 1, patient: 'Amit Verma', doctor: 'Dr. Sharma', time: '10:00 AM', status: 'Checked In' },
    { id: 2, patient: 'Priya Kapoor', doctor: 'Dr. Deshmukh', time: '10:15 AM', status: 'Waiting' },
    { id: 3, patient: 'Rahul Singh', doctor: 'Dr. Sharma', time: '10:30 AM', status: 'Pending' },
    { id: 4, patient: 'Sneha Patel', doctor: 'Dr. Iyer', time: '11:00 AM', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Front Desk</h1>
          <p className="text-gray-500">Manage Patients & Appointments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/patients')}>
            <Search size={18} className="mr-2 inline" /> Patient Search
          </Button>
          <Button variant="primary" onClick={() => navigate('/dashboard/patient/add')}>
            <UserPlus size={18} className="mr-2 inline" /> New Registration
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Today's Appointments</h2>
            <Button variant="outline" onClick={() => navigate('/dashboard/appointments')}>
              <Calendar size={16} className="mr-2 inline" /> Book New
            </Button>
          </div>
          
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Assigned Doctor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {todayAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-700">{apt.time}</td>
                  <td className="px-6 py-4 font-medium">{apt.patient}</td>
                  <td className="px-6 py-4">{apt.doctor}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'Checked In' ? 'bg-green-100 text-green-700' : 
                      apt.status === 'Waiting' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">Check In</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions / Available Doctors */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/dashboard/emergency')}
                className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
              >
                <span className="flex items-center gap-3">
                  <Phone size={18} className="text-red-500" />
                  <span className="font-medium text-red-700">Emergency Admission</span>
                </span>
              </button>
              <button 
                onClick={() => navigate('/dashboard/appointments')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Calendar size={18} className="text-purple-500" />
                  <span className="font-medium text-gray-700">Reschedule</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;