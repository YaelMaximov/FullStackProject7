import React, { useState } from 'react';

const EditableField = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedValue);
    setEditing(false);
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <div>
      {editing ? (
        <div className='editDiv'>
          <p><strong>{label}:</strong></p>
          <input type="text" value={editedValue} onChange={handleChange} />
          <button onClick={handleSaveClick}>
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      ) : (
        <div className='editDiv'>
          <p><strong>{label}:</strong></p>
          <p>{value}</p>

          <button onClick={handleEditClick}>
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
