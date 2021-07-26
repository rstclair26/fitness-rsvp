const FitnessClassController = require("../controllers/fitnessClass.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/classes", FitnessClassController.getAllFitnessClasses);
    app.post("/api/classes", FitnessClassController.addFitnessClass);
    app.get("/api/classes/:id", FitnessClassController.getFitnessClass);
    app.put("/api/classes/:id", FitnessClassController.updateFitnessClass);
    app.delete("/api/classes/:id", FitnessClassController.deleteFitnessClass);
}