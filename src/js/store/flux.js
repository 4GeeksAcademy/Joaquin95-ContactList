// src/store/flux.js

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      editContactData: {}
    },
    actions: {
      getContacts: async () => {
        await fetch("https://playground.4geeks.com/contact/agendas/Joaquin95")
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch contacts");
            return response.json();
          })
          .then((data) => {
            console.log("Fetched contacts:", data);
            setStore({ contacts: data.contacts });
          })
          .catch((error) => console.error("Error fetching contacts:", error));
      },

      addContact: (contact) => {
        return fetch(
          "https://playground.4geeks.com/contact/agendas/Joaquin95/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        )
          .then((response) => {
            if (!response.ok) {
              console.log(response, "Error adding contact");
            } else {
              return response.json();
            }
          })

          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.error("Error in addContact:", error);
          });
      },

      editContactData: (contactData) => {
        setStore({editContactData:contactData})
      }, 

      updateContact: (id, contact) => {
        return fetch(
          `https://playground.4geeks.com/contact/agendas/Joaquin95/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        )
          .then((response) => {
            if (!response.ok) throw new Error("Failed to update contact");
            return response.json();
          })
          .then((data) => {
            const store = getStore();
            // setStore({
            //   contacts: store.contacts.map((contact) =>
            //     contact.id === id ? data : contact
            //   ),
            // });
          })
          .catch((error) => console.error("Error updating contact:", error));
      },

      deleteContact: (id) => {
        return fetch(`https://playground.4geeks.com/contact/agendas/Joaquin95/contacts/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to delete contact");
            const store = getStore();
            setStore({
              contacts: store.contacts.filter((contact) => contact.id != id )
            })
          })
          .catch((error) => {
            console.error("Error deleting contact:", error);
          });
      },
    },
  };
};

export default getState;
