import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Save, ArrowLeft } from 'lucide-react';

const VitalsEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [vitals, setVitals] = useState({
    patientId: '',
    bpSys: '',
    bpDia: '',
    temp: '',
    pulse: '',
    spo2: ''
  });

  // Pre-fill data if navigated from Dashboard
  useEffect(() => {
    if (location.state?.patientName) {
      setVitals(prev => ({ ...prev, patientId: location.state.patientName }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Vitals Recorded Successfully for ${vitals.patientId}!`);
    // Logic to save to backend would go here
    navigate('/dashboard/nurse'); // Go back to dashboard
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Record Patient Vitals</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <Input 
            label="Patient Name / UHID" 
            name="patientId" 
            value={vitals.patientId} 
            onChange={handleChange} 
            placeholder="Search Patient..." 
            required 
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Blood Pressure</label>
              <div className="flex items-center gap-2">
                <input 
                  name="bpSys"
                  value={vitals.bpSys}
                  onChange={handleChange}
                  placeholder="120"
                  className="w-full border rounded p-2 text-center focus:ring-2 focus:ring-blue-500 outline-none"
                  type="number"
                />
                <span className="text-gray-400">/</span>
                <input 
                  name="bpDia"
                  value={vitals.bpDia}
                  onChange={handleChange}
                  placeholder="80"
                  className="w-full border rounded p-2 text-center focus:ring-2 focus:ring-blue-500 outline-none"
                  type="number"
                />
              </div>
            </div>

            <Input 
              label="Temperature (°F)" 
              name="temp" 
              type="number"
              value={vitals.temp} 
              onChange={handleChange} 
              placeholder="98.6" 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Pulse Rate (bpm)" 
              name="pulse" 
              type="number"
              value={vitals.pulse} 
              onChange={handleChange} 
              placeholder="72" 
            />
            <Input 
              label="SpO2 (%)" 
              name="spo2" 
              type="number"
              value={vitals.spo2} 
              onChange={handleChange} 
              placeholder="98" 
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Button variant="secondary" onClick={() => navigate('/dashboard/nurse')} fullWidth>
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              <Save size={18} className="mr-2 inline" /> Save Vitals Record
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VitalsEntry;