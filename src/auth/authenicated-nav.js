import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import SignupButton from './buttons/signup-button';

const AuthenticationNav = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Link to="/profile" style={{ color: '#FFFFFF', paddingRight: '50px' }}>
      Profile
    </Link>
  ) : (
    <SignupButton />
  );
};

export default AuthenticationNav;
