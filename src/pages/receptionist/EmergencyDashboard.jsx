import React from 'react';
import { Phone, Ambulance, AlertCircle, Clock } from 'lucide-react';
import Button from '../../components/common/Button';

const EmergencyDashboard = () => {
  const emergencyCases = [
    { id: 1, type: 'Cardiac Arrest', patient: 'Unknown (Male, ~50yrs)', arrival: '10:05 AM', status: 'Triaged - Red' },
    { id: 2, type: 'Road Accident', patient: 'Vikram Singh', arrival: '10:20 AM', status: 'Triaged - Yellow' },
    { id: 3, type: 'Severe Burn', patient: 'Anjali Patil', arrival: '10:45 AM', status: 'Treating' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-red-50 p-4 rounded-xl border border-red-100">
        <div>
          <h1 className="text-2xl font-bold text-red-700 flex items-center gap-2">
            <AlertCircle size={28} /> Emergency Response
          </h1>
          <p className="text-red-500">Manage incoming ER cases and ambulance dispatch</p>
        </div>
        <Button variant="danger" onClick={() => alert('Code Blue Triggered!')}>
          <Phone size={18} className="mr-2 inline animate-pulse" /> Trigger Code Blue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Emergency Cases */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Live ER Cases</h3>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">3 Active</span>
          </div>
          <div className="divide-y divide-gray-100">
            {emergencyCases.map((c) => (
              <div key={c.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <h4 className="font-bold text-gray-900">{c.type}</h4>
                  <span className="text-xs font-mono text-gray-500">{c.arrival}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{c.patient}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambulance Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">Ambulance Fleet</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg border-l-4 border-l-green-500">
              <div className="flex items-center gap-3">
                <Ambulance className="text-green-600" />
                <div>
                  <p className="font-bold text-sm">MH-12-AR-1001</p>
                  <p className="text-xs text-green-600">Available at Station</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => alert('Dispatching Ambulance...')}>Dispatch</Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg border-l-4 border-l-orange-500">
              <div className="flex items-center gap-3">
                <Ambulance className="text-orange-500" />
                <div>
                  <p className="font-bold text-sm">MH-12-AR-2022</p>
                  <p className="text-xs text-orange-600">On Mission (ETA 10m)</p>
                </div>
              </div>
              <button disabled className="text-xs text-gray-400 font-medium">Track</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;