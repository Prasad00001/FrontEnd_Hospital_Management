import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import StatsCard from '../../components/dashboard/StatsCard';
import { TestTube, FileText, Upload, AlertTriangle, CheckCircle } from 'lucide-react';

const LabDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Pending Tests', value: '8', icon: TestTube, color: 'bg-blue-500' },
    { title: 'Reports Uploaded', value: '24', icon: FileText, color: 'bg-purple-500' },
    { title: 'Critical Results', value: '2', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  // State for Pending Tests
  const [pendingTests, setPendingTests] = useState([
    { id: 1, patient: 'Amit Kumar', test: 'CBC (Blood Test)', doctor: 'Dr. Sharma', date: 'Today, 10:00 AM' },
    { id: 2, patient: 'Priya Singh', test: 'Chest X-Ray', doctor: 'Dr. Iyer', date: 'Today, 10:30 AM' },
    { id: 3, patient: 'John Doe', test: 'Lipid Profile', doctor: 'Dr. Gupta', date: 'Today, 11:00 AM' },
  ]);

  const handleUpload = (id) => {
    // Simulate Upload Process
    const confirmUpload = window.confirm("Confirm uploading report for this patient?");
    if (confirmUpload) {
      // Remove from list to simulate completion
      const updatedList = pendingTests.filter(t => t.id !== id);
      setPendingTests(updatedList);
      alert("Report Uploaded Successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pathology Lab</h1>
          <p className="text-gray-500">Manage Tests & Upload Reports</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/lab/reports')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <FileText size={18} /> View All Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Pending Test Requests</h2>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            {pendingTests.length} Pending
          </span>
        </div>
        
        {pendingTests.length > 0 ? (
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
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                      onClick={() => handleUpload(t.id)}
                    >
                      <Upload size={14} /> Upload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-10 text-center text-gray-500 flex flex-col items-center">
            <CheckCircle size={48} className="text-green-500 mb-2" />
            <p>All tests completed for now!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabDashboard;