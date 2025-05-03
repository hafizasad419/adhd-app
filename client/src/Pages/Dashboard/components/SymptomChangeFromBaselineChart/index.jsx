import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

/**
 * Chart component to display symptom changes from baseline
 * Shows percentage change over time
 */
const SymptomChangeFromBaselineChart = ({ data }) => {
  // Calculate the latest change percentage
  const latestChange = data.length > 0 ? data[data.length - 1].changePercent : 0
  const changeColor = latestChange > 0 ? "text-red-600" : "text-green-600"

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <h2 className="font-medium text-gray-800 mb-4">Symptom Score Change from Baseline</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[-1, 3]} tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}x`} />
            <Tooltip
              formatter={(value) => [`${value}x`, "Change"]}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              }
            />
            <Line
              type="monotone"
              dataKey="change"
              stroke="#9f1239"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Latest Change from Baseline: <span className={changeColor}>{latestChange}%</span>
        </p>
      </div>
    </div>
  )
}

export default SymptomChangeFromBaselineChart
