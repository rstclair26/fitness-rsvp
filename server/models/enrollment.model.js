const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FitnessClass"
    },
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);