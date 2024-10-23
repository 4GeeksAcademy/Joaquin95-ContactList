import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import ContactCard from "../component/ContactCard"; // Import the ContactCard component

export const Home = () => {
  const { actions } = useContext(Context);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = () => {
      fetch("https://playground.4geeks.com/contact/agendas/Joaquin95/contacts")
        .then((response) => {
          if (!response.ok) {
            setError("Network response was not ok");
            setLoading(false);
            return; // Exit early if the response is not OK
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Log the data to see its structure
          setContacts(data.contacts || data.data.contacts || []);
          setLoading(false); // Set loading to false after fetching data
        })
        .catch((err) => {
          console.error("Failed to fetch contacts:", err);
          setError(err.message);
          setLoading(false);
        });
    };

    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    // Call the delete action from your context or a direct fetch request
    actions.deleteContact(id); // Make sure you have this action defined in your flux.js
    setContacts(contacts.filter((contact) => contact.id !== id)); // Update local state after deletion
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Contact List</h1>
      <Link to="/AddContact" className="btn btn-primary mb-3">
        Add New Contact
      </Link>
      <div className="row">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete} // Pass the delete handler
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};
