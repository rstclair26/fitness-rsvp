const mongoose = require("mongoose");

const FitnessClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "URL of picture/icon is required"]
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Instructor is required"]
    },
    // instructor: {
    //     type: String,
    //     required: [true, "Instructor is required"],
    //     enum: [
    //         "Robert S.",
    //         "Valerie S.",
    //         "Sarah C.",
    //         "Daniel G."
    //     ]
    // },
    scheduleDays: {
        type: String,
        required: [true, "Schedule days are required"],
        enum: [
            "Monday/Wednesday/Friday",
            "Tuesday/Thursday",
            "Tuesday/Thursday/Saturday",
            "Saturday/Sunday"
        ]
    },
    scheduleTime: {
        type: String,
        required: [true, "Schedule time with AM/PM is required"],
        enum: [
            "6:00",
            "6:30",
            "7:00",
            "7:30",
            "8:00",
            "8:30",
            "9:00"
        ]
    },
    scheduleTimeAmPm: {
        type: String,
        required: [true, "Schedule time with AM/PM is required"],
        enum: [
            "AM",
            "PM"
        ]
    },
    enrollmentAllowed: {
        type: Boolean,
        default: false
    }
    // enrolledStudents: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // ]
}, { timestamps: true });

module.exports = mongoose.model("FitnessClass", FitnessClassSchema);