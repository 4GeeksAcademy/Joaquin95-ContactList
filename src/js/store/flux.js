const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: () => {
                fetch('https://playground.4geeks.com/contact/agendas/Joaquin95/contacts')
                .then((resp) => resp.json())
                .then((data) => setStore({ contacts: data }))
                .catch((error) => console.error("Error fetching contacts: ", error));
            },
          
            createUser: (userData) => {
                fetch("https://playground.4geeks.com/contact/agendas/Joaquin95/contacts", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(userData),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("User created successfully:", data);
                  })
                  .catch((error) => console.log("Error creating user: ", error));
              },
       
            updateContact: (id, updatedData) => {
                fetch(`https://playground.4geeks.com/contact/agendas/Joaquin95/contacts/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData),
                })
                    .then(res => res.json())
                    .then(updatedContact => {
                        const store = getStore();
                        setStore({
                            contacts: store.contacts.map(contact =>
                                contact.id === id ? updatedContact : contact
                            ),
                        });
                    })
                    .catch(err => console.error(err));
            },
       
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/Joaquin95/contacts/${id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        const store = getStore();
                        setStore({
                            contacts: store.contacts.filter(contact => contact.id !== id),
                        });
                    })
                    .catch(err => console.error(err));
            },
        },
    };
};
export default getState;
