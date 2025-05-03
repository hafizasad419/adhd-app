import { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Calendar component for selecting dates
 * Displays a monthly calendar with selectable days
 * Highlights current date and selected date
 */
const CalendarPicker = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Day names for header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100" aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100" aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Day names header */}
        {dayNames.map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {daysInMonth.map((day) => {
          const isSelected = isSameDay(day, selectedDate)
          const isTodayDate = isToday(day)

          return (
            <button
              key={day.toString()}
              onClick={() => onDateChange(day)}
              className={`
                py-1 text-sm rounded-md
                ${!isSameMonth(day, currentMonth) ? "text-gray-300" : "text-gray-700"}
                ${isSelected ? "bg-teal-600 text-white" : ""}
                ${isTodayDate && !isSelected ? "border border-teal-600 text-teal-600" : ""}
                ${!isSelected && !isTodayDate ? "hover:bg-gray-100" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarPicker
