import React, { useState } from 'react';
import { FileText, Search, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const PrescriptionList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Prescription History
  const prescriptions = [
    { id: 1, date: '2023-12-01', patient: 'Rahul Sharma', diagnosis: 'Viral Fever', meds: 'Paracetamol, Vitamin C' },
    { id: 2, date: '2023-11-30', patient: 'Mrs. Sunita Gupta', diagnosis: 'Migraine', meds: 'Naproxen, Anti-nausea' },
    { id: 3, date: '2023-11-28', patient: 'Amit Kumar', diagnosis: 'Hypertension', meds: 'Amlodipine' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Prescription Records</h1>
          <p className="text-gray-500">View past prescriptions issued by you</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/dashboard/prescription/create')}>
          <Plus size={18} className="mr-2 inline" /> Write New
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
        <input 
          type="text" 
          placeholder="Search by Patient Name or Diagnosis..." 
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-medium">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Diagnosis</th>
              <th className="px-6 py-4">Medicines</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prescriptions.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs">{p.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{p.patient}</td>
                <td className="px-6 py-4">{p.diagnosis}</td>
                <td className="px-6 py-4 truncate max-w-xs" title={p.meds}>{p.meds}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded flex items-center gap-1">
                    <Eye size={16} /> View
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

export default PrescriptionList;