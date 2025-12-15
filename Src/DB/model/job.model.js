import mongoose, { Schema } from "mongoose"

const jobSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["HR", "Admin"]
        },
        creatorId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true
    }
)

const JobModel = mongoose.models.jobs || mongoose.model("jobs", jobSchema)
export default JobModel