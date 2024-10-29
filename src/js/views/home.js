import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";
import ContactCard from "../component/ContactCard";
import AddContact from "../component/AddContact";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.getContacts();
}, [actions]);

  useEffect(() => {
    const fetchContacts = () => {
      fetch("https://playground.4geeks.com/contact/agendas/Joaquin95/contacts")
        .then((response) => {
          if (!response.ok) {
            setError("Network response was not ok");
            return null;  // Return null if response is not ok to avoid chaining further
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setContacts(data.contacts || data.data?.contacts || []);
          }
        })
        .catch((err) => {
          setError("Failed to fetch contacts: " + err.message);
        });
    };

    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    actions.deleteContact(id).then(() => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    });
  };


  return (
    <div className="text-center mt-5">
      <h1>Contact List</h1>
      <Link to="/add-contact" className="btn btn-primary mb-3">
        Add New Contact
      </Link>
      <div className="row">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
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
      {error && <p className="text-danger">Error: {error}</p>}
    </div>
  );
};
