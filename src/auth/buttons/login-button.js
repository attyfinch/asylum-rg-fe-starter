import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import '../../styles/RenderLandingPage.less';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className="authButton" onClick={() => loginWithRedirect()}>
      Log in
    </button>
  );
};

export default LoginButton;
