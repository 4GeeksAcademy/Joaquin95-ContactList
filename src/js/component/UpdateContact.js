// UpdateContact.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const UpdateContact = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
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

  const handleChange = (e, inputType) => {
    setContact((prevContact) => ({ ...prevContact, [inputType]: e.target.value }));
  };

  const handleSubmit = (e) => {
    console.log(contact, "handleSubmit")
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
        name="name" 
        value={contact.name} 
        onChange={(e) => handleChange(e, "name")} 
        placeholder="Full Name" 
        required 
        className="form-control mb-3"
      />
      <input 
        type="email" 
        name="email" 
        value={contact.email} 
        onChange={(e) => handleChange(e,"email")} 
        placeholder="Email" 
        required 
        className="form-control mb-3"
      />
      <input 
        type="text" 
        name="phone" 
        value={contact.phone} 
        onChange={(e) => handleChange(e,"phone")} 
        placeholder="Phone" 
        required 
        className="form-control mb-3"
      />
      <input 
        type="text" 
        name="address" 
        value={contact.address} 
        onChange={(e) => handleChange(e,"address")} 
        placeholder="Address" 
        required 
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default UpdateContact;
