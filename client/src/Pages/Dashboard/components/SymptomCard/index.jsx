import { Info } from "lucide-react"

/**
 * Card component for individual symptom with slider
 * Displays symptom name, category, and severity slider
 */
const SymptomCard = ({ symptom, onChange }) => {
  const { id, name, category, value, info } = symptom

  // Get color based on severity value
  const getSliderColor = (value) => {
    if (value <= 3) return "bg-green-500"
    if (value <= 6) return "bg-orange-500"
    return "bg-red-500"
  }


  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800">{name}</h3>
            <div className={`p-1 rounded-full ${value <= 4 ? "text-green-500" : "text-red-500"}`}>
              <Info size={14} />
            </div>
          </div>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
        <div className="text-lg font-semibold">{value}</div>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-100  custom-slider-thumb"
          style={{
            background: `linear-gradient(to right, #00897b 0%, #00897b ${((value - 1) / 9) * 100}%, #f3f4f6 ${((value - 1) / 9) * 100}%, #f3f4f6 100%)`,
          }}

        />

        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Not noticeable</span>
          <span>Severe</span>
        </div>
      </div>
    </div>
  )
}

export default SymptomCard
