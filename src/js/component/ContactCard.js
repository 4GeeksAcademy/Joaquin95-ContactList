import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Ensure you import the context

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { actions } = useContext(Context); // Get actions from context

  const handleUpdate = () => {
    navigate(`/update-contact/${contact.id}`);
  };

  const handleDelete = () => {
    // Confirm deletion before proceeding
    const confirmed = window.confirm(`Are you sure you want to delete ${contact.full_name}?`); // Adjusted to match field name
    if (confirmed) {
      actions.deleteContact(contact.id)
        .then(() => {
          alert(`${contact.full_name} has been deleted.`);
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
        <h5 className="card-title">{contact.full_name}</h5> {/* Changed to match field name */}
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
