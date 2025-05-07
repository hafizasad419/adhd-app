import { Formik, Form } from "formik";
import TextField from "@src/Components/FormikFields/TextField";
import * as yup from "yup";
import { Axios } from "@src/api";
import { dateFormat, ErrorNotification, formatDateOfBirthInput, SuccessNotification, updateAuthUser } from "@src/utils";
import { useState } from "react";
import BasePopup from "@src/Components/UI/BasePopup";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "@src/redux/slices/userSlice";

const ProfileEditingPopup = ({ profile, onClose}) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const validationSchema = yup.object({
        name: yup.string().min(3, "Come on don't be shy"),
        weight: yup
            .number()
            .typeError("Only numeric values allowed")
            .max(500, "Hmmmm....Are you sure?"),
        dateOfBirth: yup
            .string()
            .matches(dateFormat, "Invalid date format. Please use YYYY-MM-DD")
            .test("is-valid-date", "Invalid date", (value) => {
                if (!value) return true;
                const date = new Date(value);
                return (
                    date instanceof Date &&
                    !isNaN(date.getTime()) &&
                    value === date.toISOString().slice(0, 10)
                );
            })
            .test("age-limit", "Must be between 1900 and today", (value) => {
                if (!value) return true;
                const date = new Date(value);
                const year = date.getFullYear();
                const today = new Date();
                return year >= 1900 && date <= today;
            }),
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const payload = {
                name: values.name,
                dateOfBirth: values.dateOfBirth,
                weight: values.weight,
            }
            console.log("Payload", payload);
            const response = await Axios.put("/users/profile", payload,
                {
                    params: {
                        userId: user?._id,
                    }
                });
            SuccessNotification("Profile Updated Successfully")
            const updatedUser = response.data.user
            updateAuthUser("user", updatedUser)
            dispatch(updateUserInfo(updatedUser));
        } catch (error) {
            ErrorNotification(error?.response?.data?.error || 'Failed to update user profile.');
            throw error.response ? error : new Error("Unexpected error while updating user profile");
        } finally {
            setLoading(false);
            onClose();
        }
    };


    return (
        <BasePopup
            title="Edit Profile"
            onClose={onClose} show={true}>
            <Formik
                initialValues={profile}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField
                                field="name"
                                label_text="Name"
                                placeholder="Enter your name"
                                isDisabled={false}
                                onChange={(e) =>
                                    setFieldValue("name", e.target.value)
                                }
                            />

                            <TextField
                                field="dateOfBirth"
                                label_text="Date of Birth"
                                placeholder="YYYY-MM-DD"
                                maxLength={10}
                                onChange={(e) => {
                                    const formatted = formatDateOfBirthInput(e.target.value);
                                    setFieldValue('dateOfBirth', formatted);
                                    return formatted;
                                }}

                            />

                            <TextField
                                field="weight"
                                label_text="Weight"
                                type="number"
                                placeholder="Enter weight"
                                isDisabled={false}
                                onChange={(e) =>
                                    setFieldValue("weight", e.target.value)
                                }
                            />

                            <TextField
                                field="gender"
                                label_text="Gender"
                                placeholder="Gender"
                                isDisabled={true}
                                value={profile.gender}
                            />
                        </div>

                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="!px-4 !py-2 !text-sm btn-outline"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="!px-4 !py-2 !text-sm btn-primary"
                            >
                                {loading ? (
                                    <BiLoaderAlt className="animate-spin text-2xl mx-auto" />
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </BasePopup>
    );


};

export default ProfileEditingPopup;
