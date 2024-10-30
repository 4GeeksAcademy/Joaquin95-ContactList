// UpdateContact.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Import the context

const UpdateContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const { store, actions } = useContext(Context); // Get store and actions from context
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    full_name: "",
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
        actions.getContacts();
        navigate("/");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        setError("Failed to update contact. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="text-center mt-5">
      <h2>Update Contact</h2>
      <input 
        type="text" 
        name="full_name" 
        value={contact.full_name} 
        onChange={handleChange} 
        placeholder="Full Name" 
        required 
        className="form-control mb-3"
      />
      <input 
        type="email" 
        name="email" 
        value={contact.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
        className="form-control mb-3"
      />
      <input 
        type="text" 
        name="phone" 
        value={contact.phone} 
        onChange={handleChange} 
        placeholder="Phone" 
        required 
        className="form-control mb-3"
      />
      <input 
        type="text" 
        name="address" 
        value={contact.address} 
        onChange={handleChange} 
        placeholder="Address" 
        required 
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default UpdateContact;
