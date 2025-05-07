import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  subDays,
  isAfter,
  isBefore,
  startOfDay,
  addMonths,
  subMonths
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CalendarPicker = ({ selectedDate, onDateChange }) => {
  const today = startOfDay(new Date())
  const weekStart = subDays(today, 6) // past 6 days + today = 7 days
  const [currentMonth, setCurrentMonth] = useState(today)

  // Allow navigation
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }) // start Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 }) // end Saturday
  // const daysInCalendar = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const daysInCalendar = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-gray-100" aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <button onClick={handleNextMonth} className="p-1 rounded hover:bg-gray-100" aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}

        {daysInCalendar.map((day) => {
          const isSelected = isSameDay(day, selectedDate)
          const isTodayDate = isToday(day)
          const isWithinRange = !isBefore(day, weekStart) && !isAfter(day, today)

          return (
            <button
              key={day.toString()}
              onClick={() => isWithinRange && onDateChange(day)}
              disabled={!isWithinRange}
              className={`
                py-1 text-sm rounded-md
                ${!isSameMonth(day, currentMonth) ? "text-gray-300" : ""}
                ${isSelected ? "bg-teal-600 text-white" : "hover:bg-gray-100 "}
                ${isTodayDate && !isSelected ? "border border-teal-600 text-teal-600" : ""}
                ${
                  isWithinRange
                    ? "text-gray-700 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed"
                }
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
