import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user; // Need to setup rest of profile elements here

  return (
    <div className="profilePage">
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">Email address: {email}</p>
        </div>
      </div>
      <div className="row">
        <h3>Available Information from Auth0</h3>
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ProfilePage;
