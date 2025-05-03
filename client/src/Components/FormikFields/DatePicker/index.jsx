import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";

const generateRange = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const DatePicker = ({ field, form, label_text }) => {
  const currentYear = new Date().getFullYear();
  const years = generateRange(1950, currentYear);
  const months = generateRange(1, 12);
  const days = generateRange(1, 31);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (day && month && year) {
      const formatted = new Date(`${year}-${month}-${day}`);
      form.setFieldValue(field.name, formatted); // 🔥 FIXED HERE
    }
  }, [day, month, year]);

  const fieldError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-4">
      {label_text && (
        <label
          htmlFor={field.name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label_text}
        </label>
      )}
      <div className="flex gap-2">
        <Dropdown
          field=""
          label_text=""
          options={days.map((d) => ({
            label: d,
            value: String(d).padStart(2, "0"),
          }))}
          placeholder="Day"
          className="w-full"
          onChange={(val) => setDay(val)}
          value={day}
          disableFormik
        />
        <Dropdown
          field=""
          label_text=""
          options={months.map((m) => ({
            label: m,
            value: String(m).padStart(2, "0"),
          }))}
          placeholder="Month"
          className="w-full"
          onChange={(val) => setMonth(val)}
          value={month}
          disableFormik
        />
        <Dropdown
          field=""
          label_text=""
          options={years
            .slice()
            .reverse()
            .map((y) => ({ label: y, value: y }))}
          placeholder="Year"
          className="w-full"
          onChange={(val) => setYear(val)}
          value={year}
          disableFormik
        />
      </div>
      {fieldError && (
        <p className="text-sm text-red-500 mt-1">
          {form.errors[field.name]}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
