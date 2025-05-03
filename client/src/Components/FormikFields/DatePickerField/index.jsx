import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles

const DatePickerField = ({ label, selected, onChange, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg mb-2">{label}</label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd" // Customize the date format as needed
        className="w-full p-2 border rounded-md"
        {...props}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default DatePickerField;
