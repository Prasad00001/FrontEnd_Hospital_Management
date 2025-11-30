import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { TestTube, FileText, Upload, CheckSquare } from 'lucide-react';
import { AlertTriangle } from 'lucide-react'; 
const LabDashboard = () => {
  const stats = [
    { title: 'Pending Tests', value: '8', icon: TestTube, color: 'bg-blue-500' },
    { title: 'Reports Uploaded', value: '24', icon: FileText, color: 'bg-purple-500' },
    { title: 'Critical Results', value: '2', icon: AlertTriangle, color: 'bg-red-500' }, // Make sure AlertTriangle is imported or use another icon
  ];

  const pendingTests = [
    { id: 1, patient: 'Amit Kumar', test: 'CBC (Blood Test)', doctor: 'Dr. Sharma', date: 'Today, 10:00 AM' },
    { id: 2, patient: 'Priya Singh', test: 'Chest X-Ray', doctor: 'Dr. Iyer', date: 'Today, 10:30 AM' },
    { id: 3, patient: 'John Doe', test: 'Lipid Profile', doctor: 'Dr. Gupta', date: 'Today, 11:00 AM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pathology Lab</h1>
          <p className="text-gray-500">Manage Tests & Upload Reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Pending Test Requests</h2>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-medium">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Test Requested</th>
              <th className="px-6 py-4">Ref. Doctor</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pendingTests.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{t.patient}</td>
                <td className="px-6 py-4 font-bold text-blue-600">{t.test}</td>
                <td className="px-6 py-4">{t.doctor}</td>
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4">
                  <button 
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => alert(`Upload Report for ${t.patient}`)}
                  >
                    <Upload size={14} /> Upload Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default LabDashboard;// Add icon import for AlertTriangle if missing or replace in stats
