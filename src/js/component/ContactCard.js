// src/component/ContactCard.js
import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{contact.full_name}</h5>
        <p className="card-text">Email: {contact.email}</p>
        <p className="card-text">Phone: {contact.phone}</p>
        <p className="card-text">Address: {contact.address}</p>
        <Link to={`/update-contact/${contact.id}`} className="btn btn-warning">Update</Link>
        <button className="btn btn-danger ms-2" onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
