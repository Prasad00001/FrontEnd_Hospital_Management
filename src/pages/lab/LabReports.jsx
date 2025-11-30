import React, { useState } from 'react';
import { FileText, Search, Download, Eye, Filter } from 'lucide-react';
import Button from '../../components/common/Button';

const LabReports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data: Uploaded Reports History
  const reports = [
    { id: 'REP-2024-001', patient: 'Amit Kumar', test: 'CBC (Blood Count)', date: '2024-12-01', doctor: 'Dr. Sharma', status: 'Finalized' },
    { id: 'REP-2024-002', patient: 'Priya Singh', test: 'Chest X-Ray', date: '2024-11-30', doctor: 'Dr. Iyer', status: 'Finalized' },
    { id: 'REP-2024-003', patient: 'Rahul Deshmukh', test: 'Lipid Profile', date: '2024-11-29', doctor: 'Dr. Gupta', status: 'Pending Review' },
    { id: 'REP-2024-004', patient: 'Suresh Raina', test: 'Thyroid Profile', date: '2024-11-28', doctor: 'Dr. Mehta', status: 'Finalized' },
  ];

  const filteredReports = reports.filter(r => 
    r.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pathology Reports</h1>
          <p className="text-gray-500">Archive of all generated test reports</p>
        </div>
        <Button variant="outline" onClick={() => alert('Filter Modal')}>
          <Filter size={18} className="mr-2 inline" /> Filter Date
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
        <input 
          type="text" 
          placeholder="Search by Patient, Test Name or Report ID..." 
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">Report ID</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Test Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Ref. Doctor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs text-blue-600">{report.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{report.patient}</td>
                  <td className="px-6 py-4">{report.test}</td>
                  <td className="px-6 py-4">{report.date}</td>
                  <td className="px-6 py-4">{report.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Finalized' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-gray-500 hover:text-blue-600" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-green-600" title="Download">
                      <Download size={18} />
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

export default LabReports;