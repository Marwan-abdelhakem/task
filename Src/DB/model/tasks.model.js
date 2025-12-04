
import mongoose, { Schema } from "mongoose"

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        assignBy: {
            type: String,
            required: true,
        },
        assignTo: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
        files: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["available", "unavailable"],
            required: true
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const TaskModel = mongoose.models.tasks || mongoose.model("tasks", TaskSchema)
export default TaskModel