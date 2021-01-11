import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Logo = ({relativeRootPath, onClick}) => {

  const logo = 
    <>
      <img src={window.logoURL} alt='Logo' />
      <span> Poll Everyone</span>
    </>

  if (!onClick) {
    onClick = () => useHistory().push(relativeRootPath);
  }

  return <button onClick={onClick} className='logo'>{logo}</button> 
    // : (
  //   <Link to={relativeRootPath} className="logo">
  //     {logo}
  //   </Link>
  // )
}

export default Logo;