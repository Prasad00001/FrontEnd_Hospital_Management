import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../../components/common/Button';

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data for Doctors
  const doctors = [
    { id: 1, name: 'Dr. Rajesh Koothrappali', dept: 'Neurology', email: 'rajesh@hms.com', phone: '+91 9876543210', patients: 12, status: 'Available' },
    { id: 2, name: 'Dr. Priya Desai', dept: 'Pediatrics', email: 'priya@hms.com', phone: '+91 9876543211', patients: 8, status: 'In Surgery' },
    { id: 3, name: 'Dr. Sheldon Cooper', dept: 'General Physician', email: 'sheldon@hms.com', phone: '+91 9876543212', patients: 24, status: 'Available' },
    { id: 4, name: 'Dr. Leonard Hofstadter', dept: 'Dermatology', email: 'leonard@hms.com', phone: '+91 9876543213', patients: 5, status: 'On Leave' },
  ];

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctors Directory</h1>
          <p className="text-gray-500">View and manage specialist doctors</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search doctors..." 
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                {doc.name.split(' ')[1][0]}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                doc.status === 'Available' ? 'bg-green-100 text-green-700' :
                doc.status === 'In Surgery' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {doc.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800">{doc.name}</h3>
            <p className="text-blue-600 font-medium text-sm mb-4">{doc.dept}</p>
            
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail size={16} /> {doc.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> {doc.phone}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Active Patients</p>
                <p className="font-bold text-gray-800">{doc.patients}</p>
              </div>
              <Button variant="outline" onClick={() => alert('View Schedule')}>Schedule</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;