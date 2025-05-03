import React, { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

/**
 * Chart component to display symptom trends over time
 * Shows line chart with symptom scores
 * Includes time period filters (Week, Month, etc.)
 */
const SymptomTrendsChart = ({ data, symptomType }) => {
  const [timeRange, setTimeRange] = useState("Month")

  // Time range options
  const timeRanges = ["Week", "Month", "3 Months", "6 Months", "Year"]

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    // In a real app, this would filter based on the selected time range
    return data
  }, [data, timeRange])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="mb-4">
        <h2 className="font-medium text-gray-800 mb-2">Symptom Trends</h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <label htmlFor="symptomSelect" className="text-sm text-gray-600 mr-2">
              Select Symptom:
            </label>
            <select
              id="symptomSelect"
              className="text-sm border border-gray-300 rounded px-2 py-1"
              value={symptomType}
              onChange={(e) => {}}
            >
              <option value="all">All Symptoms</option>
              <option value="behavioral">Behavioral Symptoms</option>
              <option value="physical">Physical Symptoms</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  text-xs px-3 py-1 rounded-md
                  ${timeRange === range ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value}`, "Score"]}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              }
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#9f1239"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Total Symptom Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SymptomTrendsChart
