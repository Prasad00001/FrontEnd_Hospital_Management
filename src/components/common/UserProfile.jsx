import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Dr. User',
    email: currentUser?.email || 'user@hms.com',
    role: currentUser?.role || 'staff',
    phone: '+91 9876543210',
    department: 'General',
    location: 'Pune, Maharashtra'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover / Header */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white p-1 rounded-full shadow-md">
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Camera size={16} />
                </button>
              </div>
              <div className="mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-blue-600 font-medium capitalize">{profile.role} • {profile.department}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
            />
            
            <Input 
              label="Email Address" 
              name="email" 
              value={profile.email} 
              onChange={handleChange} 
              // disabled // Typically email is not editable
            />

            <Input 
              label="Phone Number" 
              name="phone" 
              value={profile.phone} 
              onChange={handleChange} 
            />

            <Input 
              label="Location / Branch" 
              name="location" 
              value={profile.location} 
              onChange={handleChange} 
            />

            <div className="md:col-span-2 pt-4 flex justify-end">
              <Button type="submit" variant="primary">
                <Save size={18} className="mr-2 inline" /> Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;