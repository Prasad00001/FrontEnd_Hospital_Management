import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { Pill, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import Button from '../../components/common/Button';

const PharmacistDashboard = () => {
  const stats = [
    { title: 'Pending Prescriptions', value: '15', icon: FileText, color: 'bg-orange-500' },
    { title: 'Medicines Low Stock', value: '4', icon: AlertTriangle, color: 'bg-red-500' },
    { title: 'Dispensed Today', value: '120', icon: CheckCircle, color: 'bg-green-500' },
  ];

  const prescriptions = [
    { id: 1, patient: 'Rahul Sharma', doctor: 'Dr. Mehta', meds: 'Paracetamol, Amoxicillin', status: 'Pending' },
    { id: 2, patient: 'Anita Desai', doctor: 'Dr. Gupta', meds: 'Metformin, Insulin', status: 'Pending' },
    { id: 3, patient: 'Suresh Raina', doctor: 'Dr. Mehta', meds: 'Painkiller', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pharmacy Store</h1>
          <p className="text-gray-500">Dispense Medicines & Manage Inventory</p>
        </div>
        <Button variant="primary" onClick={() => alert('Manage Inventory')}>
          <Pill size={18} className="mr-2 inline" /> Inventory Check
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Prescription Queue</h2>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-medium">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4">Medicines Prescribed</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prescriptions.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{p.patient}</td>
                <td className="px-6 py-4">{p.doctor}</td>
                <td className="px-6 py-4">{p.meds}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {p.status === 'Pending' && (
                    <button className="text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">
                      Dispense
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacistDashboard;