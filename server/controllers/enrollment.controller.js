const Enrollment = require("../models/enrollment.model");

module.exports.addEnrollment = (req, res) => {
    console.log("In addEnrollment");
    console.log(req.body);

    Enrollment.create(req.body)
        .then((newEnrollment) => {
            res.json(newEnrollment);
            console.log(newEnrollment)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
}

module.exports.getEnrollmentsForStudent = (req, res) => {
    console.log("In getEnrollmentsForStudent");
    console.log(req.params.id);

    Enrollment.find({ student_id: req.params.id })
        .then((studentEnrollments) => {
            res.json(studentEnrollments);
            console.log(studentEnrollments)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
}

module.exports.getEnrollmentsForClass = (req, res) => {
    console.log("In getEnrollmentsForClass");
    console.log(req.params.id);

    Enrollment.find({ class_id: req.params.id })
        .then((classEnrollments) => {
            res.json(classEnrollments);
            console.log(classEnrollments)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
}

module.exports.deleteEnrollment = (req, res) => {
    console.log("In deleteEnrollment");
    console.log(req.params.id);

    Enrollment.findByIdAndDelete(req.params.id)
        .then((deletedEnrollment) => res.json(deletedEnrollment))
        .catch((err) => res.json(err))
}