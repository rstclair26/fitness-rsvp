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
    instructor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Instructor is required"]
    },
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
            "12:00",
            "12:30",
            "1:00",
            "1:30",
            "2:00",
            "2:30",
            "3:00",
            "3:30",
            "4:00",
            "4:30",
            "5:00",
            "5:30",
            "6:00",
            "6:30",
            "7:00",
            "7:30",
            "8:00",
            "8:30",
            "9:00",
            "9:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30"
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
}, { timestamps: true });

module.exports = mongoose.model("FitnessClass", FitnessClassSchema);