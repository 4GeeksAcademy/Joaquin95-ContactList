// src/store/flux.js

const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        contacts: [],
      },
      actions: {
        
        getContacts: () => {
          fetch("https://playground.4geeks.com/contact/agendas/Joaquin95/contacts")
            .then((response) => response.ok ? response.json() : null)
            .then((data) => {
              if (data) setStore({ contacts: data.contacts || [] });
              else console.error("Failed to fetch contacts");
            })
            .catch((error) => console.error("Error fetching contacts:", error));
        },
  
        // Add a new contact
        addContact: (contact) => {
          fetch("https://playground.4geeks.com/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          })
          .then(response => response.ok ? response.json() : null)
          .then(data => {
            if (data) {
              setStore((prevState) => ({
                contacts: [...prevState.contacts, data],
              }));
            } else {
              console.error("Failed to add contact");
            }
          })
          .catch(error => console.error("Error adding contact:", error));
        },
  
        updateContact: (id, updatedContact) => {
          fetch(`https://playground.4geeks.com/contact/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          })
          .then(response => response.ok ? response.json() : null)
          .then(data => {
            if (data) {
              setStore((prevState) => ({
                contacts: prevState.contacts.map(contact => 
                  contact.id === id ? data : contact
                ),
              }));
            } else {
              console.error("Failed to update contact");
            }
          })
          .catch(error => console.error("Error updating contact:", error));
        },
  
        // Delete a contact
        deleteContact: (id) => {
          fetch(`https://playground.4geeks.com/contact/${id}`, {
            method: "DELETE",
          })
          .then(response => {
            if (response.ok) {
              setStore((prevState) => ({
                contacts: prevState.contacts.filter(contact => contact.id !== id),
              }));
            } else {
              console.error("Failed to delete contact");
            }
          })
          .catch(error => console.error("Error deleting contact:", error));
        },
      },
    };
  };
  
  export default getState;