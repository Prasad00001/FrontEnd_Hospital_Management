import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Calendar, User, Clock } from 'lucide-react';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    type: 'Consultation'
  });

  const doctors = [
    { id: 1, name: 'Dr. Rajesh Koothrappali (Neurology)' },
    { id: 2, name: 'Dr. Priya Desai (Pediatrics)' },
    { id: 3, name: 'Dr. Sheldon Cooper (General Physician)' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    alert(`Appointment Booked for ${formData.patientName} with ${formData.doctor}`);
    navigate('/dashboard/receptionist');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book New Appointment</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <Input 
            label="Patient Name / Mobile / UHID" 
            name="patientName" 
            value={formData.patientName}
            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            placeholder="Search Patient..."
            required
          />

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Doctor</label>
            <select 
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={formData.doctor}
              onChange={(e) => setFormData({...formData, doctor: e.target.value})}
              required
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Date" 
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <Input 
              label="Time Slot" 
              type="time"
              name="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>

          <div>
             <label className="block text-gray-700 text-sm font-bold mb-2">Appointment Type</label>
             <div className="flex gap-4">
                {['Consultation', 'Follow-up', 'Emergency', 'Vaccination'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer border p-3 rounded hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="type" 
                      value={type}
                      checked={formData.type === type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
             </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button variant="secondary" onClick={() => navigate(-1)} fullWidth>Cancel</Button>
            <Button type="submit" variant="primary" fullWidth>Confirm Booking</Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookAppointment;