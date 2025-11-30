import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

const CreatePrescription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Basic Presctiption Info
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  
  // Dynamic Medicine List
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '1-0-1', duration: '5 Days' }
  ]);

  // Add a new empty row
  const addMedicineRow = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '1-0-1', duration: '5 Days' }]);
  };

  // Remove a row
  const removeMedicineRow = (index) => {
    const list = [...medicines];
    list.splice(index, 1);
    setMedicines(list);
  };

  // Handle Input Change for Medicines
  const handleMedicineChange = (index, field, value) => {
    const list = [...medicines];
    list[index][field] = value;
    setMedicines(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      console.log({ patientName, diagnosis, medicines });
      alert("Prescription Sent to Pharmacy!");
      setLoading(false);
      navigate('/dashboard/doctor');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Write New Prescription</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Patient Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Patient Name / UHID" 
              name="patient" 
              value={patientName} 
              onChange={(e) => setPatientName(e.target.value)} 
              placeholder="Search Patient..." 
              required
            />
            <Input 
              label="Diagnosis" 
              name="diagnosis" 
              value={diagnosis} 
              onChange={(e) => setDiagnosis(e.target.value)} 
              placeholder="e.g. Viral Fever" 
              required
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Medicines</h3>
            
            {/* Medicine Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 mb-2 text-sm font-medium text-gray-500 bg-gray-50 p-2 rounded">
              <div className="col-span-4">Medicine Name</div>
              <div className="col-span-3">Dosage (mg/ml)</div>
              <div className="col-span-2">Frequency</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {/* Dynamic Rows */}
            <div className="space-y-3">
              {medicines.map((med, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-gray-50 md:bg-white p-4 md:p-0 rounded border md:border-none">
                  <div className="md:col-span-4">
                    <label className="md:hidden text-xs text-gray-500">Medicine</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Paracetamol"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={med.name}
                      onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="md:hidden text-xs text-gray-500">Dosage</label>
                    <input 
                      type="text" 
                      placeholder="500mg"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="md:hidden text-xs text-gray-500">Frequency</label>
                    <select 
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={med.frequency}
                      onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                    >
                      <option>1-0-1</option>
                      <option>1-1-1</option>
                      <option>1-0-0</option>
                      <option>0-0-1</option>
                      <option>SOS</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="md:hidden text-xs text-gray-500">Duration</label>
                    <input 
                      type="text" 
                      placeholder="5 Days"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1 text-center">
                    <button 
                      type="button" 
                      onClick={() => removeMedicineRow(index)}
                      className="text-red-500 p-2 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="button"
              onClick={addMedicineRow}
              className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
            >
              <Plus size={18} /> Add Another Medicine
            </button>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" isLoading={loading}>
              <Save size={18} className="mr-2 inline" /> Submit Prescription
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePrescription;