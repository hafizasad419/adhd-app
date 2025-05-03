import { Pencil } from "lucide-react"

/**
 * Displays user profile information in a card format
 * Shows name, last updated date, date of birth, gender, and weight
 */
const ProfileOverviewCard = ({ profile }) => {
  const { name, lastUpdated, dateOfBirth, gender, weight } = profile

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">👤</span>
          </div>
          <div>
            <h2 className="font-medium text-gray-800">Profile Overview</h2>
            <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Pencil size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Name</p>
          <p className="text-sm text-gray-800">{name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
          <p className="text-sm text-gray-800">{dateOfBirth}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Weight</p>
          <p className="text-sm text-gray-800">{weight || "Not set"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Gender</p>
          <p className="text-sm text-gray-800">{gender}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverviewCard
