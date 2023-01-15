const FitnessClassController = require("../controllers/fitnessClass.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/classes", authenticate, FitnessClassController.getAllFitnessClasses);
    app.post("/api/classes", authenticate, FitnessClassController.addFitnessClass);
    app.get("/api/classes/:id", authenticate, FitnessClassController.getFitnessClass);
    app.put("/api/classes/:id", authenticate, FitnessClassController.updateFitnessClass);
    app.delete("/api/classes/:id", authenticate, FitnessClassController.deleteFitnessClass);
}