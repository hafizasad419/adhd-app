import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["behavioral", "physical"],
        },
    },
    { timestamps: true }
);

export const Symptom = mongoose.model("Symptom", symptomSchema);
