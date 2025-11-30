import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  FileText, 
  Settings, 
  Activity,
  UserPlus,
  Phone,
  Pill,
  TestTube,
  ClipboardList
} from 'lucide-react';

const Sidebar = ({ userRole }) => {
  const location = useLocation();

  const menus = {
    admin: [
      { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Doctors', path: '/dashboard/doctors', icon: Stethoscope },
      { name: 'Staff', path: '/dashboard/staff', icon: Users },
      { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ],
    doctor: [
      { name: 'Dashboard', path: '/dashboard/doctor', icon: LayoutDashboard },
      { name: 'My Patients', path: '/dashboard/patients', icon: Users },
      { name: 'Appointments', path: '/dashboard/doctor/appointments', icon: Calendar },
      { name: 'Prescriptions', path: '/dashboard/doctor/prescriptions', icon: FileText },
    ],
    nurse: [
      { name: 'Dashboard', path: '/dashboard/nurse', icon: LayoutDashboard },
      { name: 'Patient Vitals', path: '/dashboard/vitals', icon: Activity },
      { name: 'Admissions', path: '/dashboard/admissions', icon: UserPlus },
    ],
    receptionist: [
      { name: 'Dashboard', path: '/dashboard/receptionist', icon: LayoutDashboard },
      { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
      { name: 'Patients', path: '/dashboard/patients', icon: Users },
      { name: 'Emergency', path: '/dashboard/emergency', icon: Phone },
    ],
    pharmacist: [
      { name: 'Dashboard', path: '/dashboard/pharmacist', icon: LayoutDashboard },
      { name: 'Prescriptions', path: '/dashboard/pharmacy/prescriptions', icon: ClipboardList },
      { name: 'Inventory', path: '/dashboard/pharmacy/inventory', icon: Pill },
    ],
    lab_tech: [
      { name: 'Dashboard', path: '/dashboard/lab', icon: LayoutDashboard },
      { name: 'Pending Tests', path: '/dashboard/lab/tests', icon: TestTube },
      { name: 'Reports', path: '/dashboard/lab/reports', icon: FileText },
    ]
  };

  const currentMenu = menus[userRole] || menus['admin'];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300">
      <div className="h-16 flex items-center justify-center border-b border-slate-700 bg-slate-800">
        <h1 className="text-xl font-bold tracking-wider">HMS INDIA</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white border-r-4 border-blue-300' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Connected Profile Link */}
      <Link to="/dashboard/profile" className="block p-4 border-t border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white">
            {userRole ? userRole[0].toUpperCase() : 'U'}
          </div>
          <div>
            <p className="text-sm font-medium capitalize text-white">{userRole?.replace('_', ' ') || 'User'}</p>
            <p className="text-xs text-slate-400">View Profile</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;