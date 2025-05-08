import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { SYMPTOMS } from "@src/constants";
import Dropdown from "@src/Components/FormikFields/Dropdown";
import { fetchAllSavedEntryDates, fetchSymptomEntryForDate } from "./api";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";



const ALL_SYMPTOMS_OPTION = { value: "all", label: "All Symptoms" };
const symptomOptions = [
  ALL_SYMPTOMS_OPTION,
  ...SYMPTOMS.map(symptom => ({ value: symptom.id, label: symptom.name }))
];

const SymptomTrendsChart = () => {
  const user = useSelector(state => state.user)
  const userId = user?._id
  const [selectedSymptom, setSelectedSymptom] = useState("all");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadChartData = async () => {
      setLoading(true);
      try {
        const datesMap = await fetchAllSavedEntryDates(userId); // returns { '2025-05-01': true, ... }
        const dates = Object.keys(datesMap).sort(); // sort for better graph order
        const allData = [];

        for (const date of dates) {
          const res = await fetchSymptomEntryForDate(userId, date); // returns { symptoms: [...] }

          const symptoms = res.symptoms;
          let score = 0;

          if (selectedSymptom === "all") {
            score = symptoms.reduce((acc, s) => acc + (s?.value || 0), 0);
          } else {
            const match = symptoms.find(s => s.id === selectedSymptom || s.symptomId === selectedSymptom);
            score = match?.value ?? 0;
          }

          allData.push({
            date: format(parseISO(date), "MMM dd yyyy"),
            score
          }
          );
        }

        setChartData(allData);
      } catch (err) {
        console.error("Error loading chart data", err);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [selectedSymptom, userId]);

  const maxY = selectedSymptom === "all" ? 220 : 10;

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Symptom Trends</h2>

      <div className="mb-6 max-w-xs">
        <Dropdown
          field="selectedSymptom"
          options={symptomOptions}
          placeholder="Select Symptom"
          disableFormik
          value={selectedSymptom}
          onChange={setSelectedSymptom}
        />
      </div>

      {loading ? (
        <p className="text-gray-700">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              tick={{ fontSize: 10, fill: '#364153' }}
              dataKey="date" />
            <YAxis domain={[0, maxY]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#00897b"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SymptomTrendsChart;
