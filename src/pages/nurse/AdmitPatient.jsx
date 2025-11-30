import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Bed, Save } from 'lucide-react';

const AdmitPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',
    wardType: 'General Ward',
    bedNumber: '',
    admissionDate: new Date().toISOString().split('T')[0],
    diagnosis: '',
    doctor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Patient Admitted to ${formData.wardType}, Bed ${formData.bedNumber}`);
    navigate('/dashboard/nurse');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <Bed size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">In-Patient Admission (IPD)</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Patient UHID / Name" 
              value={formData.patientId}
              onChange={(e) => setFormData({...formData, patientId: e.target.value})}
              placeholder="Search..."
              required
            />
            <Input 
              label="Attending Doctor" 
              value={formData.doctor}
              onChange={(e) => setFormData({...formData, doctor: e.target.value})}
              placeholder="Dr. Name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Ward Type</label>
              <select 
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.wardType}
                onChange={(e) => setFormData({...formData, wardType: e.target.value})}
              >
                <option>General Ward</option>
                <option>Semi-Private</option>
                <option>Private Suite</option>
                <option>ICU</option>
                <option>Emergency</option>
              </select>
            </div>
            <Input 
              label="Bed Number" 
              value={formData.bedNumber}
              onChange={(e) => setFormData({...formData, bedNumber: e.target.value})}
              placeholder="e.g. G-104"
              required
            />
          </div>

          <div>
             <label className="block text-gray-700 text-sm font-bold mb-2">Provisional Diagnosis</label>
             <textarea 
                className="w-full border rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                placeholder="Reason for admission..."
             ></textarea>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth>
              <Save size={18} className="mr-2 inline" /> Admit Patient
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdmitPatient;