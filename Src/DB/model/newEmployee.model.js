import mongoose, { Schema } from "mongoose"

const newEmployeeSchema = new Schema(
    {
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
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            uniqe: true
        },
        phone: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"]
        },
        qualification: {
            type: String,
            required: true,
        },
        skills: {
            type: String,
            required: true,
        },
        range_salary: {
            type: Number,
            required: true
        },
        experince: {
            type: String,
            required: true,
        },
        cv: {
            type: [String],
            default: [],
        },
        job_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const newEmployeeModel = mongoose.models.newEmployee || mongoose.model("newEmployee", newEmployeeSchema)
export default newEmployeeModel