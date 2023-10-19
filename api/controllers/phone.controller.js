const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const { type, number } = req.body;
    const { contactId } = req.params;

    if (!contactId) {
        return res.status(400).json({ message: "contactId is required" });
    }

    db.contacts.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ message: "Contact cannot be found at all" });
            }

            Phones.create({
                type: type,
                number: number,
                contactId: contactId
            })
            .then(phone => {
                res.status(200).json(phone);
            })
            .catch(err => {
                res.status(500).json({ message: "Error creating phone" });
            });
        })
        .catch(err => {
            res.status(501).json({ message: "Error retrieving contact details" });
        });
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
    const { phoneId } = req.params;
    Phones.findByPk(phoneId)
        .then(phone => {
            if (!phone) {
                return res.status(404).json({ message: "Phone couldn't be hunted down" });
            } 
            
        phone.destroy()
        .then(() => {
            res.json({});
        })
        .catch(err => {
            res.status(500).json({ message: "Error, phone has survived erasure" });
        });
            
        })  
};