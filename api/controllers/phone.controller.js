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


// Get one phone by phone id
exports.findOne = (req, res) => {
    const { phoneId } = req.params;
    Contacts.findByPk(phoneId)
        .then (phone => {
            if (!phone) {
                res.status(404).json({ message: 'Phone does not exist, check your spelling' });
            } else {
                res.status(200).json(phone);
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Phone could not be retrieved.'})
        })
};

// Update one phone by phone id
exports.update = (req, res) => {
    const { phoneId } = req.params;
    const { type, number } = req.body;
    Contacts.findByPk(phoneId)
        .then(phone => {
            if (!phone) {
                res.status(404).json({ message: 'Phone is in another castle' });
            } else {
                return contact.update({ type, number });
            }
        })
        .then(updatedPhone => {
            res.status(200).json(updatedPhone);
        })
        .catch(err => {
            res.status(500).json({ message: 'Phone refuses to be updated' });
        })
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