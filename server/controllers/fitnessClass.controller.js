const FitnessClass = require("../models/fitnessClass.model");

module.exports.getAllFitnessClasses = (req, res) => {
    console.log("In getAllFitnessClasses");

    FitnessClass.find({})
        .then((fitnessClasses) => {
            res.json(fitnessClasses);
            console.log(fitnessClasses)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
}

module.exports.getFitnessClass = (req, res) => {
    console.log("In getFitnessClass");
    console.log(req.params.id);

    FitnessClass.findById(req.params.id)
        .then((fitnessClass) => {
            res.json(fitnessClass);
            console.log(fitnessClass)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
}

module.exports.addFitnessClass = (req, res) => {
    console.log("In addFitnessClass");
    console.log(req.body);

    FitnessClass.create(req.body)
        .then((newFitnessClass) => {
            res.json(newFitnessClass);
            console.log(newFitnessClass)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
}

module.exports.updateFitnessClass = (req, res) => {
    console.log("In updateFitnessClass");
    console.log(req.params.id);
    console.log(req.body);

    FitnessClass.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedFitnessClass) => res.json(updatedFitnessClass))
        .catch((err) => res.json(err))
}

module.exports.deleteFitnessClass = (req, res) => {
    console.log("In deleteFitnessClass");
    console.log(req.params.id);

    FitnessClass.findByIdAndDelete(req.params.id)
        .then((deletedFitnessClass) => res.json(deletedFitnessClass))
        .catch((err) => res.json(err))
}