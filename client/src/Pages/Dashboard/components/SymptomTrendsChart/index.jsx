import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { SYMPTOMS } from "@src/constants";
import Dropdown from "@src/Components/FormikFields/Dropdown";
import { fetchAllSavedEntryDates, fetchSymptomEntryForDate } from "./api";
import { useSelector } from "react-redux";
import { format, parseISO, subDays, subMonths } from "date-fns";

const ALL_SYMPTOMS_OPTION = { value: "all", label: "All Symptoms" };
const symptomOptions = [
  ALL_SYMPTOMS_OPTION,
  ...SYMPTOMS.map(symptom => ({ value: symptom.id, label: symptom.name }))
];

const timeRanges = ["Week", "Month", "3 Months", "6 Months", "Year"];
const timeRangeOptions = timeRanges.map(label => ({ label, value: label }));

const SymptomTrendsChart = () => {
  const user = useSelector(state => state.user);
  const userId = user?._id;

  const [selectedSymptom, setSelectedSymptom] = useState("all");
  const [selectedRange, setSelectedRange] = useState("Month");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadChartData = async () => {
      setLoading(true);
      try {
        const datesMap = await fetchAllSavedEntryDates(userId); // { '2025-05-01': true, ... }
        let dates = Object.keys(datesMap).sort(); // oldest to newest

        // Filter dates based on selected range
        const now = new Date();
        let cutoff;

        switch (selectedRange) {
          case "Week":
            cutoff = subDays(now, 7);
            break;
          case "Month":
            cutoff = subMonths(now, 1);
            break;
          case "3 Months":
            cutoff = subMonths(now, 3);
            break;
          case "6 Months":
            cutoff = subMonths(now, 6);
            break;
          case "Year":
            cutoff = subMonths(now, 12);
            break;
          default:
            cutoff = null;
        }

        if (cutoff) {
          dates = dates.filter(dateStr => parseISO(dateStr) >= cutoff);
        }

        const allData = [];

        for (const date of dates) {
          const res = await fetchSymptomEntryForDate(userId, date);
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
          });
        }

        setChartData(allData);
      } catch (err) {
        console.error("Error loading chart data", err);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [selectedSymptom, selectedRange, userId]);

  const maxY = selectedSymptom === "all" ? 220 : 10;

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Symptom Trends</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="max-w-xs">
          <Dropdown
            field="selectedSymptom"
            options={symptomOptions}
            placeholder="Select Symptom"
            disableFormik
            value={selectedSymptom}
            onChange={setSelectedSymptom}
          />
        </div>

        <div className="max-w-xs">
          <Dropdown
            field="selectedRange"
            options={timeRangeOptions}
            placeholder="Select Range"
            disableFormik
            value={selectedRange}
            onChange={setSelectedRange}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              tick={{ fontSize: 10, fill: '#364153' }}
              dataKey="date"
            />
            <YAxis
                label={{
                  value: "Score",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { textAnchor: "middle", fill: "#364153", fontSize: 12 }
                }}
              domain={[0, maxY]} />
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
