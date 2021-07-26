const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = function(app) {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/administrators", UserController.getAllAdministrators);
    app.get("/api/users/instructors", UserController.getAllInstructors);
    app.get("/api/users/students", UserController.getAllStudents);
    app.put("/api/users/:id", UserController.updateUser);
    app.delete("/api/users/:id", UserController.deleteUser);
}