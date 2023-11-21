import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage = () => {
  const { user } = useAuth0();
  const { name } = user; // Need to setup rest of profile elements here
  return (
    <div>
      <h1>Profile Page</h1>
      <div>{name}</div>
    </div>
  );
};

export default ProfilePage;
