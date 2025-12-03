import mongoose, { Schema } from "mongoose"

const adminSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["Admin"]
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

const AdminModel = mongoose.models.admin || mongoose.model("admin", adminSchema)

export default AdminModel