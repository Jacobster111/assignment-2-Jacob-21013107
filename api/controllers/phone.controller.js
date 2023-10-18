const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
  
};

// Update one phone by id
exports.update = (req, res) => {
    
};

// Delete one phone by id
exports.delete = (req, res) => {
    
};