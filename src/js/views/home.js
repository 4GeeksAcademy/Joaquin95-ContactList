import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

export const Home = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getContacts();
  }, []);

  const handleDelete = (id) => {
    actions.deleteContact(id)
    .then(() => {
      actions.getContacts(); 
    })
    .catch((error) => {
      console.error("Failed to delete contact:", error);
      alert("Failed to delete contact. Please try again.");
    });
};
  console.log(store.contacts, "Testing contacts")
  return (
    <div className="text-center mt-5">
      <h1>Contact List</h1>
      <div className="row">
        {store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};
