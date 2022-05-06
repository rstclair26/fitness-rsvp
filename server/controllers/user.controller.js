const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    console.log("In register");
    const newUser = new User(req.body);
    newUser.save()
        .then(() => {
            console.log("Successful user registration");
            res.json({
                message: "Successfully registered user",
                user: newUser
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.login = (req, res) => {
    console.log("In login");
    
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                console.log("User not found");
                res.status(400).json({ message: "Invalid login attempt" });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isPasswordValid) => {
                        if (isPasswordValid) {
                            console.log("Password is valid");
                            res.cookie("usertoken",
                                jwt.sign({
                                    _id: user._id,
                                    email: user.email
                                }, process.env.JWT_SECRET),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 86400000)
                                })
                                .json({
                                    message: "Successfully logged in",
                                    userLoggedIn: {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        role: user.role
                                    }
                                })
                        } else {
                            console.log("Invalid password");
                            res.status(400).json({ message: "Invalid login attempt" });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({ message: "Invalid login attempt" });
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "Invalid login attempt" });
        })
}

module.exports.logout = (req, res) => {
    console.log("In logout");
    res.clearCookie("usertoken");
    res.json({ message: "You have successfully logged out" });
}

module.exports.getAllAdministrators = (req, res) => {
    console.log("In getAllAdministrators");

    User.find({ role: "Administrator" })
        .then((users) => {
            res.json(users);
            console.log(users);
        })
        .catch((err) => {
            res.json(err);
            console.log(err);
        })
}

module.exports.getAllInstructors = (req, res) => {
    console.log("In getAllInstructors");

    User.find({ role: "Instructor" }).sort({ lastName: "ascending", firstName: "ascending" })
        .then((users) => {
            res.json(users);
            console.log(users);
        })
        .catch((err) => {
            res.json(err);
            console.log(err);
        })
}

module.exports.getAllStudents = (req, res) => {
    console.log("In getAllStudents");

    User.find({ role: "Student" })
        .then((users) => {
            res.json(users);
            console.log(users);
        })
        .catch((err) => {
            res.json(err);
            console.log(err);
        })
}

module.exports.updateUser = (req, res) => {
    console.log("In updateUser");
    console.log(req.params.id);
    console.log(req.body);

    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) => res.json(err))
}

module.exports.deleteUser = (req, res) => {
    console.log("In deleteUser");
    console.log(req.params.id);

    User.findByIdAndDelete(req.params.id)
        .then((deletedUser) => res.json(deletedUser))
        .catch((err) => res.json(err))
}