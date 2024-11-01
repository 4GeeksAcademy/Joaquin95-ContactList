import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

const AddContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [contact, setContact] = useState({ full_name: "", email: "", phone: "", address: "" });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting contact:", contact);
    actions.addContact(contact)
      .then(() => {
        navigate("/"); // Redirect to contacts list after adding
      })
      .catch((err) => {
        console.error("Failed to add contact:", err);
        alert(`Failed to add contact: ${err}`); // Show more detailed error to user
      });
  };

  return (
    <form onSubmit={handleSubmit} className="text-center mt-5">
      <h2>Add a new contact</h2>
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
      
      <div className="mt-3">
        <Link to="/" className="text-decoration-none">or get back to contacts</Link>
      </div>
    </form>
  );
};

export default AddContact;
