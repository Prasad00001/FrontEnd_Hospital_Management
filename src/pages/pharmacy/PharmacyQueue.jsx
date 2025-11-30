import React from 'react';
import { Pill, Check, Clock } from 'lucide-react';

const PharmacyQueue = () => {
  const prescriptions = [
    { id: 101, patient: 'Rahul Sharma', meds: ['Paracetamol 500mg', 'Amoxicillin 250mg'], status: 'Pending' },
    { id: 102, patient: 'Sneha Patel', meds: ['Metformin 500mg'], status: 'Pending' },
    { id: 103, patient: 'Amit Verma', meds: ['Ibuprofen 400mg', 'Antacid Syrup'], status: 'Dispensed' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pharmacy Dispensing Queue</h1>
      
      <div className="grid gap-4">
        {prescriptions.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-800">{p.patient}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  p.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                }`}>
                  {p.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.meds.map((med, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm border border-blue-100">
                    <Pill size={14} className="inline mr-1" /> {med}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              {p.status === 'Pending' ? (
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  onClick={() => alert(`Medicines dispensed for ${p.patient}`)}
                >
                  <Check size={18} /> Mark Dispensed
                </button>
              ) : (
                <button disabled className="bg-gray-100 text-gray-400 px-6 py-2 rounded-lg cursor-not-allowed font-medium">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyQueue;