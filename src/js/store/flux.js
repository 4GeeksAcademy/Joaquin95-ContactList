// src/store/flux.js

const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        contacts: [], // Initial state for contacts
      },
      actions: {
        // Fetch all contacts
        getContacts: () => {
          fetch("https://playground.4geeks.com/contact/agendas/Joaquin95/contacts")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch contacts");
              }
              return response.json();
            })
            .then((data) => {
              setStore({ contacts: data.contacts || [] });
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
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to add contact");
            }
            return response.json();
          })
          .then(data => {
            // Optionally update the store after adding a contact
            setStore((prevState) => ({
              contacts: [...prevState.contacts, data],
            }));
          })
          .catch(error => console.error("Error adding contact:", error));
        },
  
        // Update an existing contact
        updateContact: (id, updatedContact) => {
          fetch(`https://playground.4geeks.com/contact/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to update contact");
            }
            return response.json();
          })
          .then(data => {
            // Update the contacts in the store
            setStore((prevState) => ({
              contacts: prevState.contacts.map(contact => 
                contact.id === id ? data : contact
              ),
            }));
          })
          .catch(error => console.error("Error updating contact:", error));
        },
  
        // Delete a contact
        deleteContact: (id) => {
          fetch(`https://playground.4geeks.com/contact/${id}`, {
            method: "DELETE",
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to delete contact");
            }
            // Optionally update the store after deleting a contact
            setStore((prevState) => ({
              contacts: prevState.contacts.filter(contact => contact.id !== id),
            }));
          })
          .catch(err => {
            console.error("Delete error:", err);
          });
        },
      },
    };
  };
  
  export default getState;
  