import React, { useState, useEffect  } from 'react';
import UserData from './UserData';
import OrderHistory from './OrderHistory';
import './PersonalArea.css'

const PersonalArea = () => {
  // Sample user data (replace with actual data from your backend or state management)


  const user = JSON.parse(localStorage.getItem('current'));

  const [userData, setUserData] = useState(user);
  

  useEffect(() => {
    localStorage.setItem('current', JSON.stringify(userData));
  }, [userData]);

  const handleFieldSave = async (fieldName, value) => {
    setUserData((prevData) => ({ ...prevData, [fieldName]: value }));
    try {
        await fetch('http://localhost:3001/users/update-user-field', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.user_id,
            field: fieldName,
            newValue: value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Handle the response data accordingly
            //localStorage.setItem('current', JSON.stringify(userData));
          })
          .catch((error) => {
            console.error('Error updating quantity:', error);
            // Handle the error case
          });
      }
      catch (error) {
        console.error('Error updating quantity:', error);
  
      }
  };

  return (
    <div className='all'>
      <h1>user Area</h1>
      <div className='personalAreaDiv'>
      <UserData className='userData' userData={userData} onFieldSave={handleFieldSave} />
      <OrderHistory className='orderHistory' userId={user.user_id} />

      </div>
      
    </div>
  );
};

export default PersonalArea;
