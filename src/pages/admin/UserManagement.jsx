import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Plus, X, Search, Trash2, Mail } from 'lucide-react';

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Rajesh Koothrappali', email: 'rajesh@hms.com', role: 'Doctor', dept: 'Neurology', status: 'Active' },
    { id: 2, name: 'Nurse Anjali', email: 'anjali@hms.com', role: 'Nurse', dept: 'ICU', status: 'Active' },
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Doctor',
    department: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call to create user
    const newUser = {
      id: users.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      dept: formData.department,
      status: 'Active'
    };
    setUsers([...users, newUser]);
    setShowModal(false);
    alert(`User Created! Username: ${formData.firstName}.${formData.lastName}@hospital.com`);
    setFormData({ firstName: '', lastName: '', email: '', role: 'Doctor', department: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-500">Create and manage hospital staff accounts</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={18} className="mr-2 inline" /> Add New Staff
        </Button>
      </div>

      {/* User List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-medium">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase">{user.role}</span>
                </td>
                <td className="px-6 py-4">{user.dept}</td>
                <td className="px-6 py-4 text-green-600 font-medium">{user.status}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                  >
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">Add New User</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="John" />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Doe" />
              </div>
              
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john@hospital.com" />
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Receptionist</option>
                  <option>Pharmacist</option>
                  <option>Lab Technician</option>
                </select>
              </div>

              <Input label="Department" name="department" value={formData.department} onChange={handleInputChange} required placeholder="e.g. Cardiology" />

              <div className="pt-2">
                <Button type="submit" variant="primary" fullWidth>Create Account</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;