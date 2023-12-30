import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

// Virtual field for user-friendly completion status
todoSchema.virtual("isCompleted").get(function () {
    return this.completed ? "Completed" : "Pending";
});

export default mongoose.model("Todo", todoSchema);
