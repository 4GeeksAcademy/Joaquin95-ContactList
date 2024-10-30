import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

export const Home = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getContacts(); // Fetch contacts once when component mounts
  }, [actions]);

  const handleDelete = (id) => {
    actions.deleteContact(id).then(() => {
      actions.getContacts(); // Refresh contacts after deletion
    });
  };

  return (
    <div className="text-center mt-5">
      <h1>Contact List</h1>
      <div className="row">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete} // Pass handleDelete to ContactCard
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};
