import { useState, useEffect, useCallback } from 'react';  // import useEffect
import './App.css';

function App() {
    // Define state for the list of contacts
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState('');
    const [phoneDetails, setPhoneDetails] = useState([]);
    const [newPhoneType, setNewPhoneType] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');

    // Allows for contacts to stay upon refreshing
    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => {
                setContacts(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Allows for phones to stay upon refreshing
  
    
    // Function to handle adding a contact
    const handleAddContact = () => {
        if (newContact.trim() !== '') {
            fetch('http://localhost/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newContact })
            })
            .then(response => response.json())
            .then(data => {
                setContacts(prevContacts => [...prevContacts, data]);
                setNewContact('');
            })
            .catch(error => console.error('Error:', error));
        }
    };

    // Deleting Contacts
    const deleteContact = async (contactId) => {
        console.log(`Attempting to delete contact with ID: ${contactId}`);
        
        try {
            const response = await fetch(`http://localhost/api/contacts/${contactId}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                console.error(`Error deleting contact. Status: ${response.status}`);
                return;
            }
    
            const newContactList = contacts.filter(contact => contact.id !== contactId);
            console.log(`Contact with ID ${contactId} successfully deleted.`);
            setContacts(newContactList);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddPhone = (contactId) => {
        if (newPhoneType.trim() !== '' && newPhoneNumber.trim() !== '') {
            fetch(`http://localhost/api/contacts/${contactId}/phones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: newPhoneType, number: newPhoneNumber })
            })
            .then(response => response.json())
            .then(data => {
                // Update the contacts state to reflect the new phone details
                setContacts(prevContacts => prevContacts.map(contact => {
                    if (contact.id === contactId) {
                        return {
                            ...contact,
                            phones: [...(contact.phones || []), data]
                        };
                    }
                    return contact;
                }));
                // Reset the phone type and number input fields
                setNewPhoneType('');
                setNewPhoneNumber('');
            })
            .catch(error => console.error('Error:', error));
        } else {
            console.error('Phone type and number must be filled.');
        }
    };

    // Deleting phones
    const handleDeletePhone = (contactId, phoneId) => {
        fetch(`http://localhost/api/contacts/${contactId}/phones/${phoneId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            // Update the contacts state to remove the deleted phone
            setContacts(prevContacts => prevContacts.map(contact => {
                if (contact.id === contactId) {
                    return {
                        ...contact,
                        phones: contact.phones.filter(phone => phone.id !== phoneId)
                    };
                }
                return contact;
            }));
        })
        .catch(error => console.error('Error:', error));
    };
    

    return (
        <div>
            <h1>Contact List</h1>
            <br/>
            <input type="text" value={newContact} onChange={(e) => setNewContact(e.target.value)}/>
            <input type="button" value="Add Contact" onClick={handleAddContact}/>
            <br/><br/>
            <div>
                {contacts.map((contact) => (
                    <div key={contact.id}>
                        {contact.name}
                        <input type="button" value="Delete Contact" onClick={() => deleteContact(contact.id)}/>
                        <div>
                            <input type="text" placeholder="Phone Type" value={newPhoneType} onChange={(e) => setNewPhoneType(e.target.value)}/>
                            <input type="text" placeholder="Phone Number" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)}/>
                            <input type="button" value="Add Phone" onClick={() => handleAddPhone(contact.id)}/>
                            {contact.phones && contact.phones.map(phone => (
                                <div key={phone.id}>
                                    {phone.type}: {phone.number}
                                    <input type="button" value='Delete Phone' onClick={() => handleDeletePhone(contact.id, phone.id)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;