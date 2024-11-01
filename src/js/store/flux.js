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
            console.log("Fetched contacts:", data);
            setStore({ contacts: data });
          })
          .catch((error) => console.error("Error fetching contacts:", error));
      },
      
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
              return response.json().then((result) => {
                console.error("Failed to add contact:", result);
                return Promise.reject(result.message || "Failed to add contact.");
              });
            }
            return response.json();
          })

          .then((data) => {
            if (data && data.id) { 
              setStore({ contacts: [...getStore().contacts, data] });
            } else {
              console.warn("Unexpected response structure:", data);
            }
            return data;
          })
          .catch((error) => {
            console.error("Error in addContact:", error);
            alert("Failed to add contact.");
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
          if (!response.ok) throw new Error("Failed to update contact");
          return response.json();
        })
        .then((data) => {
          const store = getStore();
          setStore({
            contacts: store.contacts.map((contact) =>
              contact.id === id ? data : contact
            ),
          });
        })
        .catch((error) => console.error("Error updating contact:", error));
    },

      deleteContact: (id) => {
        return fetch(`https://playground.4geeks.com/contact/${id}`, {
          method: "DELETE",
        })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete contact");
          const store = getStore();
          setStore({
            contacts: store.contacts.filter((contact) => contact.id !== id),
          });
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
