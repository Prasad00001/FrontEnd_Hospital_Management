import React, { useState } from 'react';
import { Plus, Search, AlertTriangle, Package, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Mock Data
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol 500mg', batch: 'BTC-001', stock: 1200, unit: 'Tablets', expiry: '2024-12-01', status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', batch: 'AMC-992', stock: 45, unit: 'Capsules', expiry: '2023-10-15', status: 'Low Stock' },
    { id: 3, name: 'Insulin Glargine', batch: 'INS-554', stock: 12, unit: 'Vials', expiry: '2024-05-20', status: 'Critical' },
    { id: 4, name: 'Cetirizine 10mg', batch: 'CET-112', stock: 500, unit: 'Tablets', expiry: '2025-01-01', status: 'In Stock' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', batch: '', stock: '', unit: 'Tablets', expiry: '' });

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = { ...newItem, id: Date.now(), status: parseInt(newItem.stock) < 50 ? 'Low Stock' : 'In Stock' };
    setInventory([...inventory, item]);
    setShowModal(false);
    setNewItem({ name: '', batch: '', stock: '', unit: 'Tablets', expiry: '' });
  };

  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pharmacy Inventory</h1>
          <p className="text-gray-500">Track medicine stock and expiry</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={18} className="mr-2 inline" /> Add Stock
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
        <Input 
          placeholder="Search by Medicine Name or Batch ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-6 top-6 text-gray-400" size={20} />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium">
              <tr>
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Batch No.</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{item.batch}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold">{item.stock}</span> {item.unit}
                  </td>
                  <td className="px-6 py-4">{item.expiry}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Add New Medicine</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <Input label="Medicine Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Batch No" value={newItem.batch} onChange={e => setNewItem({...newItem, batch: e.target.value})} required />
                <Input label="Expiry Date" type="date" value={newItem.expiry} onChange={e => setNewItem({...newItem, expiry: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Quantity" type="number" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} required />
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Unit</label>
                  <select 
                    className="w-full border rounded p-2"
                    value={newItem.unit}
                    onChange={e => setNewItem({...newItem, unit: e.target.value})}
                  >
                    <option>Tablets</option>
                    <option>Capsules</option>
                    <option>Syrup (ml)</option>
                    <option>Vials</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={() => setShowModal(false)} fullWidth>Cancel</Button>
                <Button type="submit" fullWidth>Add Stock</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;