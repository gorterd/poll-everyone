import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({relativeRootPath}) => {
  return (
    <Link to={relativeRootPath} className="logo">
      <img src={window.logoURL} alt='Poll Everyone logo'/>
      <span> Poll Everyone</span>
    </Link>
  )
}

export default Logo;