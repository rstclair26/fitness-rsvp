const EnrollmentController = require("../controllers/enrollment.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/enrollments", EnrollmentController.addEnrollment);
    app.get("/api/enrollments/student/:id", EnrollmentController.getEnrollmentsForStudent);
    app.get("/api/enrollments/class/:id", EnrollmentController.getEnrollmentsForClass);
    app.delete("/api/enrollments/:id", EnrollmentController.deleteEnrollment);
}