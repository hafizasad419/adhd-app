import SymptomCard from "../SymptomCard"

/**
 * Container component for all symptom cards
 * Groups and renders individual symptom cards
 */
const SymptomList = ({ symptoms, onSymptomChange }) => {
  return (
    <div className="mt-6 md:max-w-3xl md:pr-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Symptoms</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {symptoms.map((symptom) => (
          <SymptomCard 
          key={symptom.id}
          symptom={symptom}
          onChange={(value) => onSymptomChange(symptom.id, value)} />
        ))}
      </div>
    </div>
  )
}

export default SymptomList
