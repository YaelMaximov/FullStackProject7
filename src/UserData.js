import React from 'react';
import EditableField from './EditableField';

const UserData = ({className, userData, onFieldSave }) => {
  return (
    <div className={className}>
      <EditableField label="Name" value={userData.name} onSave={(value) => onFieldSave('name', value)} />
      <EditableField label="Phone" value={userData.phone} onSave={(value) => onFieldSave('phone', value)} />
      <EditableField label="Email" value={userData.email} onSave={(value) => onFieldSave('email', value)} />
      <EditableField label="Address" value={userData.address} onSave={(value) => onFieldSave('address', value)} />

    </div>
  );
};

export default UserData;
