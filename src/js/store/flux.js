// src/store/flux.js

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      getContacts: () => {
        fetch(
          'https://playground.4geeks.com/contact/agendas/Joaquin95'
        )
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch contacts");
            return response.json();
          })
          .then((data) => {
            setStore({ contacts: data }); // Assuming `data` contains the contacts list
          })
          .catch((error) => console.error("Error fetching contacts:", error));
      },
      // Add a new contact
      addContact: (contact) => {
        return fetch('https://playground.4geeks.com/contact/agendas/Joaquin95/contacts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        })
          .then((response) => {
            if (!response.ok) {
              console.error("Failed to add contact.");
              return Promise.reject("Failed to add contact.");
            }
            return response.json();
          })
          .then((data) => {
            // Update contacts in the global store
            setStore({ contacts: [...getStore().contacts, data] });
            return data;
          });
      },

      updateContact: (id, updatedContact) => {
        return fetch(`https://playground.4geeks.com/contact/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update contact");
            }
            return response.json();
          })
          .then((data) => {
            setStore((prevState) => ({
              contacts: prevState.contacts.map((contact) =>
                contact.id === id ? data : contact
              ),
            }));
          });
      },

      // Delete a contact
      deleteContact: (id) => {
        return fetch(`https://playground.4geeks.com/contact/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to delete contact");
            // Update the store to remove the deleted contact
            setStore((prevState) => ({
              contacts: prevState.contacts.filter(
                (contact) => contact.id !== id
              ),
            }));
          })
          .catch((error) => {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact. Please try again.");
          });
      },
    },
  };
};

export default getState;
