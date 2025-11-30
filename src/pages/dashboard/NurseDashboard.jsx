import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { Activity, Thermometer, Heart, Bed, Users, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const NurseDashboard = () => {
  // Mock Data: Ward Stats
  const stats = [
    { title: 'Admitted Patients', value: '42', icon: Bed, color: 'bg-blue-500' },
    { title: 'Critical Attention', value: '3', icon: AlertCircle, color: 'bg-red-500' },
    { title: 'Discharges Today', value: '5', icon: Users, color: 'bg-green-500' },
  ];

  // Mock Data: Admitted Patients needing vitals check
  const wardPatients = [
    { id: 201, name: 'Mr. Ramesh Powar', bed: 'Ward A - 101', condition: 'Stable', lastVitals: '2 hrs ago', nextDue: 'Now' },
    { id: 202, name: 'Mrs. Linda Dsouza', bed: 'Ward A - 104', condition: 'Critical', lastVitals: '15 mins ago', nextDue: '30 mins' },
    { id: 203, name: 'Master Arjun Singh', bed: 'ICU - 02', condition: 'Recovering', lastVitals: '1 hr ago', nextDue: '2 hrs' },
    { id: 204, name: 'Mr. John Smith', bed: 'Ward B - 205', condition: 'Stable', lastVitals: '4 hrs ago', nextDue: 'Now' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Nurse Station</h1>
          <p className="text-gray-500">General Ward & ICU Monitoring</p>
        </div>
        <Button variant="primary" onClick={() => alert('Admit Patient Modal')}>
          + New Admission
        </Button>
      </div>

      {/* 1. Ward Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* 2. Patient Vitals Monitoring List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Patient Vitals Due</h2>
          <div className="flex gap-2">
            <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded">Critical: 3</span>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded">Stable: 39</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Bed / Room</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Check</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {wardPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4">{patient.bed}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.condition === 'Critical' ? 'bg-red-100 text-red-700 animate-pulse' : 
                      patient.condition === 'Recovering' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{patient.lastVitals}</span>
                      <span className={`text-xs ${patient.nextDue === 'Now' ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                        Next: {patient.nextDue}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-blue-200"
                      onClick={() => alert(`Open Vitals Entry for ${patient.name}`)}
                    >
                      Update Vitals
                    </button>
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

export default NurseDashboard;