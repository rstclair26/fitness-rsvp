const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"]
    },
    role: {
        type: String,
        required: [true, "Requested role is required"],
        enum: [
            "Administrator",
            "Instructor",
            "Student"
        ]
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this.confirmPassword = value);

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password and confirm password must match")
    }

    next();
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
})

module.exports = mongoose.model("User", UserSchema);