const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = function(app) {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/administrators", authenticate, UserController.getAllAdministrators);
    app.get("/api/users/instructors", authenticate, UserController.getAllInstructors);
    app.get("/api/users/students", authenticate, UserController.getAllStudents);
    app.put("/api/users/:id", authenticate, UserController.updateUser);
    app.delete("/api/users/:id", authenticate, UserController.deleteUser);
}