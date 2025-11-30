import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const DoctorAppointments = () => {
  const [filter, setFilter] = useState('Today');

  // Mock Appointment Data
  const appointments = [
    { id: 1, patient: 'Mrs. Sunita Gupta', time: '10:30 AM', type: 'Consultation', status: 'In Progress', date: 'Today' },
    { id: 2, patient: 'Rahul Deshmukh', time: '10:45 AM', type: 'Follow-up', status: 'Waiting', date: 'Today' },
    { id: 3, patient: 'Amit Kumar', time: '11:00 AM', type: 'New Visit', status: 'Waiting', date: 'Today' },
    { id: 4, patient: 'John Doe', time: '09:00 AM', type: 'General Checkup', status: 'Completed', date: 'Today' },
    { id: 5, patient: 'Priya Singh', time: '10:00 AM', type: 'Report Review', status: 'Cancelled', date: 'Today' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-500">Manage your daily schedule</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['Today', 'Upcoming', 'History'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === tab ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-700 flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" /> {apt.time}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{apt.patient}</td>
                  <td className="px-6 py-4">{apt.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'In Progress' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                      apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {apt.status === 'Waiting' && (
                      <Button variant="primary" onClick={() => alert(`Started consultation with ${apt.patient}`)}>
                        Start Consult
                      </Button>
                    )}
                    {apt.status === 'In Progress' && (
                      <Button variant="outline" onClick={() => alert(`Finished consultation with ${apt.patient}`)}>
                        Finish
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;