import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import Button from '../../components/common/Button';
import { Users, Clock, Calendar, Activity, Search, ChevronRight } from 'lucide-react';
import Input from '../../components/common/Input';

const DoctorDashboard = () => {
  // Mock Data: Today's Stats
  const stats = [
    { title: 'Patients Waiting', value: '8', icon: Users, color: 'bg-orange-500' },
    { title: 'Appointments Today', value: '24', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Completed', value: '12', icon: Activity, color: 'bg-green-500' },
  ];

  // Mock Data: Next Patient in Queue
  const currentPatient = {
    id: 101,
    name: 'Mrs. Sunita Gupta',
    age: 45,
    gender: 'Female',
    time: '10:30 AM',
    reason: 'Severe Migraine & Nausea',
    status: 'In Cabin',
    priority: 'High'
  };

  // Mock Data: Upcoming List
  const upcomingPatients = [
    { id: 102, name: 'Rahul Deshmukh', time: '10:45 AM', type: 'Follow-up', status: 'Waiting' },
    { id: 103, name: 'Amit Kumar', time: '11:00 AM', type: 'New Visit', status: 'Waiting' },
    { id: 104, name: 'Priya Singh', time: '11:15 AM', type: 'Report Review', status: 'Confirmed' },
    { id: 105, name: 'John Doe', time: '11:30 AM', type: 'General Checkup', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Top Section: Stats & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor's Console</h1>
          <p className="text-gray-500">Good Morning, Dr. Sharma</p>
        </div>
        <div className="w-full md:w-96">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search patient by Name or UHID..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. CURRENT PATIENT CARD (Main Focus) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Activity size={20} /> Current Patient
              </h2>
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                In Consultation
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                      SG
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentPatient.name}</h3>
                      <p className="text-gray-500">{currentPatient.age} Yrs • {currentPatient.gender}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase">Appointment Time</p>
                      <p className="font-semibold text-gray-900">{currentPatient.time}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-red-500 uppercase">Chief Complaint</p>
                      <p className="font-semibold text-red-900">{currentPatient.reason}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions for Doctor */}
                <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                  <Button variant="primary" fullWidth onClick={() => alert('Open Prescription Modal')}>
                    Write Prescription
                  </Button>
                  <Button variant="outline" fullWidth onClick={() => alert('View History')}>
                    View History
                  </Button>
                  <Button variant="secondary" fullWidth onClick={() => alert('Request Lab Test')}>
                    Lab Orders
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. UPCOMING QUEUE (Side Panel) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Up Next</h2>
            <Clock size={18} className="text-gray-400" />
          </div>
          
          <div className="divide-y divide-gray-100">
            {upcomingPatients.map((patient) => (
              <div key={patient.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="text-center min-w-[3rem]">
                    <p className="text-xs text-gray-500 font-medium">Time</p>
                    <p className="text-sm font-bold text-gray-900">{patient.time}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.type}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500" />
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 text-center">
            <button className="text-sm text-blue-600 font-medium hover:underline">View Full Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;