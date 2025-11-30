import React, { useState } from 'react';
import { TestTube, CheckCircle, Upload, Clock, Search } from 'lucide-react';
import Button from '../../components/common/Button';

const TestQueue = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock Data
  const [tests, setTests] = useState([
    { id: 1, patient: 'Amit Kumar', test: 'CBC (Blood Count)', doctor: 'Dr. Sharma', date: '2023-11-30', status: 'pending' },
    { id: 2, patient: 'Priya Singh', test: 'Chest X-Ray', doctor: 'Dr. Iyer', date: '2023-11-30', status: 'pending' },
    { id: 3, patient: 'Rahul Deshmukh', test: 'Lipid Profile', doctor: 'Dr. Gupta', date: '2023-11-29', status: 'completed' },
  ]);

  const handleUpload = (id) => {
    // In real app, this opens a file picker
    const updatedTests = tests.map(t => 
      t.id === id ? { ...t, status: 'completed' } : t
    );
    setTests(updatedTests);
    alert(`Report Uploaded for Test ID: ${id}`);
  };

  const filteredTests = tests.filter(t => t.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Pathology Requests</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'pending' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'completed' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-medium">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Test Requested</th>
              <th className="px-6 py-4">Ref. Doctor</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTests.length > 0 ? (
              filteredTests.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">#{t.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{t.patient}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{t.test}</td>
                  <td className="px-6 py-4">{t.doctor}</td>
                  <td className="px-6 py-4">{t.date}</td>
                  <td className="px-6 py-4">
                    {t.status === 'pending' ? (
                      <Button variant="outline" onClick={() => handleUpload(t.id)}>
                        <Upload size={16} className="mr-2 inline" /> Upload Report
                      </Button>
                    ) : (
                      <span className="inline-flex items-center text-green-600 px-3 py-1 bg-green-50 rounded-full text-xs font-medium">
                        <CheckCircle size={14} className="mr-1" /> Report Ready
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                  No {activeTab} tests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestQueue;