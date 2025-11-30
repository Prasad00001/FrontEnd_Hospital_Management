import { Link } from 'react-router-dom'

export const RecentPatients = ({ patients = [] }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-900">Recent Patients</h2>
        <Link to="/patients" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </Link>
      </div>
      <div>
        {patients.map((patient) => (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                {patient.initials}
              </div>
              <div>
                <p className="font-medium text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-500">ID: {patient.id} • {patient.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{patient.doctor}</p>
              <p className="text-xs text-gray-500">{patient.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}