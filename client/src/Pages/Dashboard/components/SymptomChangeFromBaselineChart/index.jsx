import { useEffect, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts"
import { useSelector } from "react-redux"
import { fetchAllSavedEntryDates, fetchSymptomEntryForDate } from "../SymptomTrendsChart/api"
import { format, parseISO } from "date-fns"

const SymptomChangeFromBaselineChart = () => {
  const user = useSelector(state => state.user)
  const userId = user?._id

  const [selectedSymptom, setSelectedSymptom] = useState("all")
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const loadChartData = async () => {
      setLoading(true)
      try {
        const datesMap = await fetchAllSavedEntryDates(userId)
        let dates = Object.keys(datesMap).sort() // oldest to newest

        if (dates.length === 0) return

        // Removed cutoff filtering – now uses all available dates
        const allData = []
        let baseline = null

        for (const date of dates) {
          const res = await fetchSymptomEntryForDate(userId, date)
          const symptoms = res.symptoms
          let score = 0

          if (selectedSymptom === "all") {
            score = symptoms.reduce((acc, s) => acc + (s?.value || 0), 0)
          } else {
            const match = symptoms.find(s => s.id === selectedSymptom || s.symptomId === selectedSymptom)
            score = match?.value ?? 0
          }

          if (baseline === null) baseline = score

          const change = baseline === 0 ? 0 : (score / baseline)
          const changePercent = baseline === 0 ? 0 : Math.round((change - 1) * 100)

          allData.push({
            date: format(parseISO(date), "MMM dd yyyy"),
            change,
            changePercent
          })
        }

        setChartData(allData)
      } catch (err) {
        console.error("Error loading baseline chart data", err)
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [selectedSymptom, userId])

  const latestChange = chartData.length > 0 ? chartData[chartData.length - 1].changePercent : 0
  const changeColor = latestChange > 0 ? "text-red-600" : "text-green-600"

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <h2 className="font-medium text-gray-800 mb-4">Symptom Score Change from Baseline</h2>

      {loading ? (
        <p className="text-gray-700">Loading chart...</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={d => d}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
                tickFormatter={(val) => `${((val - 1) * 100).toFixed(0)}%`}
                label={{
                  value: "Change from Baseline",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { textAnchor: "middle", fill: "#364153", fontSize: 12 }
                }}
              />
              <Tooltip
                formatter={(value) => [`${((value - 1) * 100).toFixed(0)}%`, "Change"]}
                labelFormatter={(label) => label}
              />
              <Line
                type="monotone"
                dataKey="change"
                stroke="#00897b"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Latest Change from Baseline: <span className={changeColor}>{latestChange}%</span>
        </p>
      </div>
    </div>
  )
}

export default SymptomChangeFromBaselineChart
