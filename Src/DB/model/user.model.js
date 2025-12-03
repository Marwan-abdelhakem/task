import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["User"]
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

const UserModel = mongoose.models.users || mongoose.model("users", UserSchema)

export default UserModel