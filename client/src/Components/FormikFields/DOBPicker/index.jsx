import React from 'react';
import { useField } from 'formik';
import Picker from 'react-mobile-picker';

// Define the days, months, and years
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

const DOBPicker = ({ label, name, ...props }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (value, column) => {
    helpers.setValue({
      ...field.value,
      [column]: value
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-lg mb-2">{label}</label>
      <Picker
        value={field.value}
        onChange={(value) => handleChange(value, Object.keys(value)[0])}
        wheelMode="natural"
        height={200}
        itemHeight={40}
        {...props}
      >
        <Picker.Column name="day">
          {days.map(day => (
            <Picker.Item key={day} value={day}>
              {({ selected }) => (
                <div style={{ color: selected ? '#0ea5e9' : '#333' }} >
                  {day}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="month">
          {months.map(month => (
            <Picker.Item key={month} value={month}>
              {({ selected }) => (
                <div style={{ color: selected ? '#0ea5e9' : '#333' }} >
                  {month}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="year">
          {years.map(year => (
            <Picker.Item key={year} value={year}>
              {({ selected }) => (
                <div style={{ color: selected ? '#0ea5e9' : '#333' }} >
                  {year}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>

      {/* Display error if validation fails */}
      {field.error && field.touched && (
        <div className="text-red-500 text-sm">{field.error}</div>
      )}
    </div>
  );
};

export default DOBPicker;
