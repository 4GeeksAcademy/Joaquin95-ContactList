import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleUpdate = () => {
    actions.editContactData(contact);
    navigate(`/update-contact/${contact.id}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${contact.name}?`
    );
    if (confirmed) {
      actions.deleteContact(contact.id);
      actions.getContacts()
        .then(() => {
          alert(`${contact.name} has been deleted.`);
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete contact. Please try again.");
        });
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Name: {contact.name}</h5>
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
