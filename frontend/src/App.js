import { useState, useEffect } from 'react';  // import useEffect
import './App.css';

function App() {
    // Define state for the list of contacts
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState('');

    // Allows for contacts to stay upon refreshing
    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => {
                setContacts(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);


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
    

    return (
        <div>
        <h1>Contact List</h1>
        <br/>
        <input type="text" value={newContact} onChange={(e) => setNewContact(e.target.value)}/>
        <input type="button" value="Add Contact" onClick={handleAddContact}/>
        <br/><br/>
        <div>
            {contacts.map((contact) => (
            <div key={contact.id}>{contact.name}
            <input type="button" value="Delete Contact" onClick={() => deleteContact(contact.id)}/>
            </div>
            ))}
        </div>
    </div>
    );
}

export default App;