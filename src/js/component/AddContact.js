import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  
  const [contact, setContact] = useState({ full_name: "", email: "", phone: "", address: "" });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.addContact(contact); // Add contact using actions from context
    navigate("/"); // Redirect back to home page after adding the contact
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="full_name" 
        value={contact.full_name} 
        onChange={handleChange} 
        placeholder="Full Name" 
        required 
      />
      <input 
        type="email" 
        name="email" 
        value={contact.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      <input 
        type="text" 
        name="phone" 
        value={contact.phone} 
        onChange={handleChange} 
        placeholder="Phone" 
        required 
      />
      <input 
        type="text" 
        name="address" 
        value={contact.address} 
        onChange={handleChange} 
        placeholder="Address" 
        required 
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContact;
