import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import TextField from '@src/Components/FormikFields/TextField';
import Dropdown from '@src/Components/FormikFields/Dropdown';
import { BiLoaderAlt } from 'react-icons/bi';
import { userSignup } from './api';
import { useNavigate, NavLink } from 'react-router-dom';
import { GENDERS } from '@src/constants';
import { formatDateOfBirthInput, dateFormat } from '@src/utils';
import { Brain } from 'lucide-react';



const Signup = () => {
    const navigate = useNavigate();

    const validationSchema = yup.object({
        name: yup.string().min(3, "Come on don't be shy").required('Required'),
        dateOfBirth: yup
            .string()
            .max(10)
            .matches(dateFormat, 'Invalid date format. Please use YYYY-MM-DD').test('is-valid-date', 'Invalid date', (value) => {
                if (!value) return false;
                const date = new Date(value);
                const isValid =
                    date instanceof Date &&
                    !isNaN(date.getTime()) &&
                    value === date.toISOString().slice(0, 10); // Strict match
                return isValid;
            })
            .test('age-limit', 'Must be between 1900 and today', (value) => {
                if (!value) return false;
                const date = new Date(value);
                const year = date.getFullYear();
                const today = new Date();
                return year >= 1900 && date <= today;
            }).required('Required'),

        gender: yup.string().oneOf(GENDERS, 'Invalid gender').required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup
            .string()
            .min(8, 'Min 8 characters')
            .matches(/[A-Z]/, 'One uppercase required')
            .matches(/[a-z]/, 'One lowercase required')
            .matches(/\d/, 'One number required')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'One special char required')
            .required('Required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    const initialValues = {
        name: '',
        dateOfBirth: '', // This will be a string in YYYY-MM-DD format
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const { dateOfBirth, ...rest } = values;
        const payload = {
            ...rest,
            dateOfBirth: dateOfBirth || '', // Send date as string in YYYY-MM-DD format
            role: 'user',
        };

        try {
            await userSignup(payload);
            navigate('/');
        } catch (error) {
            console.log("error on signup: ", error?.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h1 className="w-full text-center text-c-zinc font-bold text-3xl md:text-4xl mb-6 pt-8 flex flex-col md:flex-row justify-center items-center md:space-x-2">
                <span>
                    <Brain className="w-10 h-10" />
                </span>
                <span>ADHD Symptom Tracker</span>
            </h1>

            <div className="flex items-center justify-center bg-gray-50 px-4 my-8">


                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 md:p-8">
                    <h2 className="text-c-zinc font-bold text-2xl md:text-3xl mb-6 text-center">Create Your Account</h2>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(form) => (
                            <Form className="space-y-4">
                                <TextField field="name" label_text="Full Name" placeholder="Enter your full name" />

                                <TextField
                                    field="dateOfBirth"
                                    label_text="Date of Birth (YYYY-MM-DD)"
                                    placeholder="YYYY-MM-DD"
                                    maxLength={10}
                                    onChange={(e) => {
                                        const formatted = formatDateOfBirthInput(e.target.value);
                                        form.setFieldValue('dateOfBirth', formatted);
                                        return formatted; // This is crucial
                                    }}
                                />


                                <Dropdown
                                    field="gender"
                                    label_text="Gender"
                                    options={GENDERS.map(g => ({ label: g, value: g }))}
                                    placeholder="Select gender"
                                />
                                <TextField field="email" label_text="Email" placeholder="Enter your email" />
                                <TextField
                                    field="password"
                                    type="password"
                                    label_text="Password"
                                    placeholder="Enter your password"
                                />
                                <TextField
                                    field="confirmPassword"
                                    type="password"
                                    label_text="Confirm Password"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    className="btn w-full btn-primary"
                                    type="submit"
                                    disabled={form.isSubmitting}
                                >
                                    {form.isSubmitting ? (
                                        <BiLoaderAlt className="animate-spin text-2xl mx-auto" />
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="text-center mt-6">
                        <span className="text-slate-700">Already have an account? </span>
                        <NavLink
                            to="/login"
                            className="text-slate-700 underline font-bold"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
