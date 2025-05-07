import { BiLoaderAlt } from "react-icons/bi"
import SymptomCard from "../SymptomCard"
import { formatSymptomScoresPayload } from "@src/utils"

/**
 * Container component for all symptom cards
 * Groups and renders individual symptom cards
 */
const SymptomList = ({ symptoms, onSymptomChange, isSaving, handleSaveEntry, entryAlreadySaved }) => {
  return (
    <>
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

      {/* Save button */}
      <div className="flex justify-center mt-8 mb-4">
        <button
          onClick={() => handleSaveEntry(formatSymptomScoresPayload(symptoms))}
          disabled={isSaving || entryAlreadySaved}
          className="btn-primary flex items-center justify-center"
        >
          {entryAlreadySaved ? (
            <span>Entry Already Saved</span>
          ) : isSaving ? (
            <span className="flex items-center gap-2">
              <BiLoaderAlt className="animate-spin h-4 w-4" />
              Saving...
            </span>
          ) : (
            "Save Today's Entry"
          )}
        </button>
      </div>


    </>
  )
}

export default SymptomList
