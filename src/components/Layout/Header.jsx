import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';

// Components conditionally render Login/Logout and Profile Link/Signup button based on auth status
import AuthenticationButton from '../../auth/authentication-button';
import AuthenticationNav from '../../auth/authenicated-nav';

const { primary_accent_color } = colors;

function HeaderContent() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <div className="navBox">
        <Link to="/" style={{ color: '#FFFFFF', paddingRight: '50px' }}>
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#FFFFFF', paddingRight: '50px' }}>
          Graphs
        </Link>
        <AuthenticationNav />
        <AuthenticationButton />
      </div>
    </div>
  );
}

export { HeaderContent };
