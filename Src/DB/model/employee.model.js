import mongoose, { Schema } from "mongoose"

const employeeSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["Employee"]
        },

        user_name: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [50, "Name must be at most 20 characters long"],
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            uniqe: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const EmployeeModel = mongoose.models.employee || mongoose.model("employee", employeeSchema)

export default EmployeeModel