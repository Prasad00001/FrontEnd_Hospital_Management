import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Edit, Plus, FileText } from 'lucide-react';
import Button from '../../components/common/Button';

const PatientsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const [patients] = useState([
    { id: 'UHID-1001', name: 'Rahul Sharma', age: 32, gender: 'Male', mobile: '9876543210', lastVisit: '2023-11-28', status: 'Admitted' },
    { id: 'UHID-1002', name: 'Priya Patel', age: 28, gender: 'Female', mobile: '9988776655', lastVisit: '2023-11-29', status: 'OPD' },
    { id: 'UHID-1003', name: 'Amit Verma', age: 45, gender: 'Male', mobile: '9123456789', lastVisit: '2023-11-25', status: 'Discharged' },
    { id: 'UHID-1004', name: 'Sneha Gupta', age: 62, gender: 'Female', mobile: '9800000000', lastVisit: '2023-11-30', status: 'Admitted' },
    { id: 'UHID-1005', name: 'Vikram Singh', age: 12, gender: 'Male', mobile: 'Guardian: 98765', lastVisit: '2023-11-30', status: 'OPD' },
  ]);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mobile.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Directory</h1>
          <p className="text-gray-500">Manage and view all registered patients</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/dashboard/patient/add')}>
          <Plus size={18} className="mr-2 inline" /> Add New Patient
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by Name, UHID or Mobile..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">UHID</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Age / Gender</th>
                <th className="px-6 py-4">Mobile</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-blue-600">{patient.id}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{patient.name}</td>
                    <td className="px-6 py-4">{patient.age} Yrs / {patient.gender}</td>
                    <td className="px-6 py-4">{patient.mobile}</td>
                    <td className="px-6 py-4">{patient.lastVisit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Admitted' ? 'bg-red-100 text-red-700' :
                        patient.status === 'Discharged' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/* Connected View Action */}
                        <button 
                          onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" 
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        
                        {/* Connected Edit Action (Simulates navigation) */}
                        <button 
                          onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" 
                          title="Edit Profile"
                        >
                          <Edit size={18} />
                        </button>
                        
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full" title="View History">
                          <FileText size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-400">
                    No patients found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsListPage;