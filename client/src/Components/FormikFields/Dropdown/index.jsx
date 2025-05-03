import { Field } from "formik";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
    field,
    label_text,
    options,
    placeholder = "Select a value",
    className = "",
    disableFormik = false,
    value,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);


    if (disableFormik) {
        return (
            <div className="relative w-full">
                <select
                    className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                >
                    <option value="">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }



    return (
        <div className="mb-4 relative w-full">
            {label_text && (
                <label htmlFor={field} className="block mb-1 text-sm font-medium text-gray-700">
                    {label_text}
                </label>
            )}

            <Field name={field}>
                {({ field: formikField, form, meta }) => {
                    const selected = formikField.value;
                    const setSelected = (value) => form.setFieldValue(field, value);
                    const error = meta.touched && meta.error;
                    const success = meta.touched && !meta.error;

                    return (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className={`w-full flex justify-between items-center bg-white rounded-md px-4 py-3 text-gray-700 shadow-sm transition-all
                  outline-none border-2 
                  ${error ? "border-red-400" : "border-gray-200"} 
                  ${success ? "border-green-400" : ""}
                  ${className}`}
                            >
                                {selected
                                    ? options.find(opt => opt.value === selected)?.label
                                    : placeholder}
                                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>

                            {isOpen && (
                                <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                                    {options.map(option => (
                                        <li
                                            key={option.value}
                                            className={`px-4 py-3 cursor-pointer transition-all 
                        ${selected === option.value ? "bg-c-zinc/80 font-semibold text-white" : "hover:bg-gray-100"}`}
                                            onClick={() => {
                                                setSelected(option.value);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {error && <p className="error-message">{meta.error}</p>}
                            {success && <p className="success-message">Looks good!</p>}
                        </>
                    );
                }}
            </Field>
        </div>
    );
};

export default Dropdown;
