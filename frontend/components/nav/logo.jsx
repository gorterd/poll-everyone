import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({relativeRootPath, onClick}) => {

  const logo = 
    <>
      <img src={window.logoURL} alt='Logo' />
      <span> Poll Everyone</span>
    </>

  return onClick ? <button onClick={onClick} className='logo'>{logo}</button> : (
    <Link to={relativeRootPath} className="logo">
      {logo}
    </Link>
  )
}

export default Logo;