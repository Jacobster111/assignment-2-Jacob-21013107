const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const name = {
        name: req.body.name
    };
    
    Contacts.create(name)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
  
};

// Update one contact by id
exports.update = (req, res) => {
    
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Contacts.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Contact with id=${id}. Maybe the Contact was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete Contact with id=${id}`
        });
    });
};
