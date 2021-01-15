import React from 'react';
import Logo from '../logo';

const Navbar = ({ additionalClasses, links, tools, logoProps = {} }) => {

  return (
    <nav className={'nav ' + additionalClasses}>
      <ul className="nav-links">
        <li><Logo { ...logoProps } /></li>
          
        {links.map( (link, i) => <li key={i}>{link}</li>)}
      </ul>
      <div className='nav-tools-container'>
        <div className='nav-triangle' />
        <ul className="nav-tools">
          {tools.map( (tool, i) => <li key={i}>{tool}</li>)}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;