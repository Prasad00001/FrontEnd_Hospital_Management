import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    hospitalName: 'HMS India',
    email: 'admin@hms.com',
    notifications: true,
    darkMode: false,
    currency: 'INR (₹)'
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings Saved Successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">General Configuration</h3>
          
          <Input 
            label="Hospital Name" 
            name="hospitalName" 
            value={settings.hospitalName} 
            onChange={handleChange} 
          />
          
          <Input 
            label="Admin Email" 
            name="email" 
            value={settings.email} 
            onChange={handleChange} 
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Currency</label>
              <select 
                name="currency" 
                value={settings.currency} 
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white"
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 pt-4">Preferences</h3>
          
          <div className="flex items-center gap-4">
             <input 
                type="checkbox" 
                id="notifications" 
                name="notifications" 
                checked={settings.notifications} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded"
             />
             <label htmlFor="notifications" className="text-gray-700">Enable Email Notifications</label>
          </div>

          <div className="pt-6">
            <Button type="submit" variant="primary">
              <Save size={18} className="mr-2 inline" /> Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;