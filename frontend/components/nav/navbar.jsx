import React from 'react';
import Logo from './logo';

const Navbar = ({relativeRootPath, additionalClasses, children}) => {
  const [links, tools] = children;

  return (
    <nav className={'nav ' + additionalClasses}>
      <div className="nav-links">
        <Logo relativeRootPath={relativeRootPath} />
        {links}
      </div>
      <div className="nav-tools">{tools}</div>
    </nav>
  )
}

export default Navbar;