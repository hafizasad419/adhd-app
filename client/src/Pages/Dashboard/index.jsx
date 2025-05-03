import { useState, useEffect } from "react"
import { SuccessNotification } from "@src/utils"
// Components
import ProfileOverviewCard from "./components/ProfileOverviewCard"
import CalendarPicker from "./components/CalendarPicker"
import SymptomTrendsChart from "./components/SymptomTrendsChart"
import SymptomChangeFromBaselineChart from "./components/SymptomChangeFromBaselineChart"
import SymptomScoreCard from "./components/SymptomScoreCard"
import SymptomList from "./components/SymptomList"

// Utils and data
import { SYMPTOMS } from "@src/constants.js"
import { formatDate, generateTrendData, generateBaselineChangeData, calculateTotalScore } from "@src/utils.js"
import { useSelector } from "react-redux"
import { BiLoaderAlt } from "react-icons/bi"

/**
 * Main Home component that serves as the container for the ADHD Symptom Tracker dashboard
 */
const Dashboard = () => {
    const user = useSelector(state => state.user)

    // State for selected date
    const [selectedDate, setSelectedDate] = useState(new Date())

    // State for symptom entries
    const [symptoms, setSymptoms] = useState([])

    // State for saving status
    const [isSaving, setIsSaving] = useState(false)

    // State for total score
    const [totalScore, setTotalScore] = useState(0)

    // Initialize symptoms with default values
    useEffect(() => {
        const initialSymptoms = SYMPTOMS?.map((symptom) => ({
            ...symptom,
            value: symptom.defaultValue,
        }))

        setSymptoms(initialSymptoms)
    }, [])

    // Calculate total score whenever symptoms change
    useEffect(() => {
        const score = calculateTotalScore(symptoms)
        setTotalScore(score)
    }, [symptoms])

    // Mock data for charts
    const trendData = generateTrendData()
    const baselineChangeData = generateBaselineChangeData()

    // Handle symptom value change
    const handleSymptomChange = (id, value) => {
        setSymptoms((prevSymptoms) => prevSymptoms.map((symptom) => (symptom.id === id ? { ...symptom, value } : symptom)))
    }

    // Handle save button click
    const handleSaveEntry = () => {
        setIsSaving(true)

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false)
            SuccessNotification("Today's entry saved successfully!")
        }, 1000)
    }

    // Mock profile data
    const profileData = {
        name: user.name,
        lastUpdated: user.updatedAt,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        weight: user.weight,
    }

    return (
        <main
            className="px-4 md:px-12 py-6"
        >

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Daily Symptom Log</h1>
                <p className="text-gray-600">{formatDate(selectedDate)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="md:col-span-2 space-y-6">
                    <ProfileOverviewCard
                        profile={profileData} />

                    <SymptomTrendsChart
                        data={trendData}
                        symptomType="all" />

                    <SymptomChangeFromBaselineChart
                        data={baselineChangeData} />
                </div>

                {/* Right column */}
                <div>
                    <CalendarPicker
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate} />

                    <div className="mt-6">
                        <SymptomScoreCard
                            score={totalScore} />
                    </div>
                </div>
            </div>

            {/* Symptoms section */}
            <SymptomList
                symptoms={symptoms}
                onSymptomChange={handleSymptomChange} />

            {/* Save button */}
            <div className="flex justify-center mt-8 mb-4">
                <button
                    onClick={handleSaveEntry}
                    disabled={isSaving}
                    className="btn-primary flex items-center justify-center"
                >
                    {isSaving ? (
                        <span className="flex items-center gap-2">
                            <BiLoaderAlt className="animate-spin h-4 w-4" />
                            Saving...
                        </span>
                    ) : (
                        "Save Today's Entry"
                    )}
                </button>
            </div>





        </main>
    )
}

export default Dashboard
