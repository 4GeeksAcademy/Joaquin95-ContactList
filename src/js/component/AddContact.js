import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ full_name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContacts = () => {
      fetch("https://playground.4geeks.com/contact/agendas/Joaquin95/contacts")
        .then((response) => {
          if (!response.ok) {
            setError("Network response was not ok");
            setLoading(false);
            return;
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            console.log("Fetched data:", data);
            setContacts(data.contacts || data.data?.contacts || []);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch contacts:", err);
          setError(err.message);
          setLoading(false);
        });
    };

    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the action to add a contact here
    console.log("Contact added:", contact);
    navigate("/contacts"); // Redirect to contacts list after adding
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
