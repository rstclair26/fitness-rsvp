const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
        },
        role: {
            type: String,
            required: [true, "Requested role is required"],
            enum: ["Administrator", "Instructor", "Student"],
        },
        isApproved: {
            type: Boolean,
            default: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        enrolledClasses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FitnessClass",
            },
        ],
    },
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(() => this.confirmPassword)
    .set((value) => (this.confirmPassword = value));

UserSchema.pre("validate", function (next) {
    if (!EMAIL_REGEX.test(this.email)) {
        this.invalidate("email", "Email address is not valid");
    }

    if (!PWD_REGEX.test(this.password)) {
        this.invalidate(
            "password",
            "Password must meet complexity requirements"
        );
    } else {
        if (this.password !== this.confirmPassword) {
            this.invalidate(
                "confirmPassword",
                "Password and confirm password must match"
            );
        }
    }

    next();
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);
