import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
// Components
import ProfileOverviewCard from "./components/ProfileOverviewCard"
import CalendarPicker from "./components/CalendarPicker"
import SymptomTrendsChart from "./components/SymptomTrendsChart"
import SymptomChangeFromBaselineChart from "./components/SymptomChangeFromBaselineChart"
import SymptomScoreCard from "./components/SymptomScoreCard"
import SymptomList from "./components/SymptomList"
import { format } from "date-fns";

// Utils and data
import { DATE_FORMAT_STRING, SYMPTOMS } from "@src/constants.js"
import { formatDate, generateBaselineChangeData, calculateTotalScore, ErrorNotification, SuccessNotification } from "@src/utils.js"
import { Axios } from "@src/api"


/**
 * Main Home component that serves as the container for the ADHD Symptom Tracker dashboard
 */
const Dashboard = () => {
    const user = useSelector(state => state.user)

    const getLocalDateString = (date = new Date()) => format(date, DATE_FORMAT_STRING);
    const [selectedDate, setSelectedDate] = useState(getLocalDateString());

    const [symptoms, setSymptoms] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [totalScore, setTotalScore] = useState(0)
    const [entryAlreadySaved, setEntryAlreadySaved] = useState(false);
    const [entryDatesMap, setEntryDatesMap] = useState({})



    const fetchSymptomEntryForDate = async (date) => {

        try {
            const res = await Axios.get("/symptom-logs/by-date", {
                params: {
                    userId: user?._id,
                    date,
                }
            });

            console.log(res)

            if (res.status === 200) {
                // Populate saved symptoms and score
                const savedScores = res.data.scores;

                const updatedSymptoms = SYMPTOMS.map(symptom => {
                    const matchingScore = savedScores.find(s => s.symptomId === symptom.id);
                    return {
                        ...symptom,
                        value: matchingScore?.score || symptom.defaultValue,
                    }
                });

                setSymptoms(updatedSymptoms);
                setEntryAlreadySaved(true);
            }
        } catch (err) {
            if (err?.response?.status === 404) {
                // No entry found
                const initialSymptoms = SYMPTOMS.map((symptom) => ({
                    ...symptom,
                    value: symptom.defaultValue,
                }));
                setSymptoms(initialSymptoms);
                setEntryAlreadySaved(false);
            } else {
                ErrorNotification("Failed to fetch entry for selected date");
            }
        }
    };


    const fetchAllSavedEntryDates = async () => {
        try {
            const res = await Axios.get("/symptom-logs/dates", {
                params: { userId: user?._id }
            })

            if (res.status === 200) {
                // console.log(res?.data?.datesWithEntries);

                const map = Object.fromEntries(
                    res.data.datesWithEntries.map(dateStr => [dateStr, true])
                );

                setEntryDatesMap(map);
            }
        } catch (error) {
            ErrorNotification(error?.response?.data?.error || 'Failed to fetch all dates with entries');
            throw error.response ? error : new Error("Something went wrong while fetching all dates with entries");
        }
    }




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

    // Fetch Symptom Entry For Selected Date
    useEffect(() => {
        if (user?._id) {
            fetchSymptomEntryForDate(selectedDate);
        }
    }, [selectedDate, user?._id]);


    useEffect(() => {
        if (user?._id) {
            fetchAllSavedEntryDates()
        }
    }, [user?._id])


    // Mock data for charts
    const baselineChangeData = generateBaselineChangeData()

    // Handle symptom value change
    const handleSymptomChange = (id, value) => {
        setSymptoms((prevSymptoms) => prevSymptoms.map((symptom) => (symptom.id === id ? { ...symptom, value } : symptom)))
    }

    // Handle save button click
    const handleSaveEntry = async (scores) => {

        // console.log("Saving Entry With Date",  selectedDate)

        try {
            setIsSaving(true);
            const response = await Axios.post('/symptom-logs', {
                userId: user?._id,
                date: selectedDate,
                scores
            });

            if (response.status === 201 || response.status === 200) {
                SuccessNotification('Entry saved successfully!');
                // ✅ Refresh entry data and saved dates immediately
                await fetchSymptomEntryForDate(selectedDate);
                await fetchAllSavedEntryDates();
                return response.data;
            }
        } catch (error) {
            ErrorNotification(error?.response?.data?.error || 'Failed to save entry.');
            throw error.response ? error : new Error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }


    const profileData = {
        name: user.name,
        lastUpdated: user.updatedAt,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        weight: user.weight,
    }

    return (
        <main
            className="px-4 md:px-12 py-6 overflow-hidden"
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
                    />

                    <SymptomChangeFromBaselineChart
                        data={baselineChangeData} />
                </div>

                {/* Right column */}
                <div>
                    <CalendarPicker
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        entryDatesMap={entryDatesMap}
                    />
                    {
                        entryAlreadySaved && (
                            <div className="mt-6">
                                <SymptomScoreCard
                                    score={totalScore} />
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Symptoms section */}
            <SymptomList
                symptoms={symptoms}
                onSymptomChange={handleSymptomChange}
                isSaving={isSaving}
                handleSaveEntry={handleSaveEntry}
                entryAlreadySaved={entryAlreadySaved}
            />

        </main>
    )
}

export default Dashboard
