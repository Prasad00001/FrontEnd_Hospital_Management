import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/dashboard/StatsCard';
import { Users, UserPlus, CreditCard, Activity, Stethoscope } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock Data
  const stats = [
    { title: 'Total Doctors', value: '142', icon: Stethoscope, color: 'bg-blue-500', trend: 12 },
    { title: 'Active Patients', value: '1,234', icon: Users, color: 'bg-green-500', trend: 8 },
    { title: 'New Appointments', value: '56', icon: Activity, color: 'bg-purple-500', trend: -2 },
    { title: 'Hospital Revenue', value: '₹ 12.5L', icon: CreditCard, color: 'bg-yellow-500', trend: 15 },
  ];

  const recentStaff = [
    { id: 1, name: 'Dr. Rajesh Koothrappali', role: 'Doctor', dept: 'Neurology', date: '2025-11-29', status: 'Active' },
    { id: 2, name: 'Nurse Anjali Sharma', role: 'Nurse', dept: 'ICU', date: '2025-11-28', status: 'Onboarding' },
    { id: 3, name: 'Dr. Priya Desai', role: 'Doctor', dept: 'Pediatrics', date: '2025-11-28', status: 'Active' },
    { id: 4, name: 'Rahul Patil', role: 'Pharmacist', dept: 'Pharmacy', date: '2025-11-27', status: 'Active' },
  ];

  const handleDownloadReport = () => {
    // Mock CSV Data
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + "Total Doctors,142\n"
      + "Active Patients,1234\n"
      + "New Appointments,56\n"
      + "Hospital Revenue,12.5L";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hospital_report.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hospital Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back, Administrator</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleDownloadReport}>
             Download Report
          </Button>
          
          {/* Linked Button to Staff Management */}
          <Button variant="primary" onClick={() => navigate('/dashboard/staff')}>
            <UserPlus size={18} className="mr-2 inline" />
            Manage Staff
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Recently Joined Staff</h2>
          <button 
            className="text-blue-600 text-sm font-medium hover:underline"
            onClick={() => navigate('/dashboard/staff')}
          >
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{staff.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      staff.role === 'Doctor' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{staff.dept}</td>
                  <td className="px-6 py-4">{staff.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        staff.status === 'Active' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}></span>
                      {staff.status}
                    </span>
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

export default AdminDashboard;