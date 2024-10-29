// UpdateContact.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Import the context

const UpdateContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const { store, actions } = useContext(Context); // Get store and actions from context
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const existingContact = store.contacts.find((c) => c.id === parseInt(id));
    if (existingContact) {
      setContact(existingContact);
    } else {
      setError("Contact not found.");
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateContact(contact.id, contact)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        setError("Failed to update contact. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Contact</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={contact.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={contact.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Contact</button>
    </form>
  );
};

export default UpdateContact;
