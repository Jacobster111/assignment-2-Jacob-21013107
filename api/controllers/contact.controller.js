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
    const { contactId } = req.params;
    Contacts.findByPk(contactId)
        .then (contact => {
            if (!contact) {
                res.status(404).json({ message: 'Contact does not exist, check your spelling' });
            } else {
                res.status(200).json(contact);
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Contact could not be retrieved.'})
        })
};

// Update one contact by id
exports.update = (req, res) => {
    const { contactId } = req.params;
    const { name } = req.body;
    Contacts.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                res.status(404).json({ message: 'Contact is in another castle' });
            } else {
                return contact.update({ name });
            }
        })
        .then(updatedContact => {
            res.status(200).json(updatedContact);
        })
        .catch(err => {
            res.status(500).json({ message: 'Contact refuses to be updated' });
        })
};

// Delete one contact by id
exports.delete = (req, res) => {
    const { contactId } = req.params;
    Contacts.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ message: "Contact couldn't be hunted down" });
            } 
            
        contact.destroy()
        .then(() => {
            res.json({});
        })
        .catch(err => {
            res.status(500).json({ message: "Error, contact has survived erasure" });
        });
            
        })   
};
