import React, { useState } from 'react';
import { Pill, Check, Clock, Search } from 'lucide-react';

const PharmacyQueue = () => {
  // Mock Data
  const [prescriptions, setPrescriptions] = useState([
    { id: 101, patient: 'Rahul Sharma', meds: ['Paracetamol 500mg', 'Amoxicillin 250mg'], status: 'Pending' },
    { id: 102, patient: 'Sneha Patel', meds: ['Metformin 500mg'], status: 'Pending' },
    { id: 103, patient: 'Amit Verma', meds: ['Ibuprofen 400mg', 'Antacid Syrup'], status: 'Dispensed' },
    { id: 104, patient: 'John Doe', meds: ['Vitamin C', 'Zinc Tablets'], status: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDispense = (id) => {
    // Logic to update status locally
    const updatedList = prescriptions.map(p => 
      p.id === id ? { ...p, status: 'Dispensed' } : p
    );
    setPrescriptions(updatedList);
    alert(`Medicines dispensed successfully for ID: #${id}`);
  };

  const filteredQueue = prescriptions.filter(p => 
    p.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Pharmacy Dispensing Queue</h1>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search Patient..." 
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredQueue.length > 0 ? (
          filteredQueue.map((p) => (
            <div key={p.id} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${p.status === 'Dispensed' ? 'opacity-75' : ''}`}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{p.patient}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    p.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.meds.map((med, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm border border-blue-100 flex items-center gap-1">
                      <Pill size={14} /> {med}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                {p.status === 'Pending' ? (
                  <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
                    onClick={() => handleDispense(p.id)}
                  >
                    <Check size={18} /> Mark Dispensed
                  </button>
                ) : (
                  <button disabled className="bg-gray-100 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed font-medium flex items-center gap-2 border border-gray-200">
                    <Check size={18} /> Completed
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed">
            No prescriptions found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyQueue;