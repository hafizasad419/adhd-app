import mongoose from "mongoose"

const symptomEntrySchema = new mongoose.Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });



export const SymptomEntry = mongoose.model("SymptomEntry", symptomEntrySchema);
