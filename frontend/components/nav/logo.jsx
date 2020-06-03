import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({relativeRootPath}) => {
  return (
    <Link to={relativeRootPath} className="logo">
      Poll Everyone
    </Link>
  )
}

export default Logo;