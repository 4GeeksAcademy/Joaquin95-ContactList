import React from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update-contact/${contact.id}`);
  };

  const handleDelete = () => {
    // Confirm deletion before proceeding
    const confirmed = window.confirm(`Are you sure you want to delete ${contact.name}?`);
    if (confirmed) {
      actions.deleteContact(contact.id);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">Email: {contact.email}</p>
        <p className="card-text">Phone: {contact.phone}</p>
        <p className="card-text">Address: {contact.address}</p>
        <button onClick={handleUpdate} className="btn btn-primary me-2">
          Update
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
