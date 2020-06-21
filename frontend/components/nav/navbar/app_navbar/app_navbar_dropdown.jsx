import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import DropdownWrapper from '../../../shared/dropdown';

const AppNavbarDropdown = ({currentUser, logout, history}) => {

  const handleLogout = () => {
    logout();
    history.push('/');
  }

  const Button = () => <span className='nav-tool'>
    {currentUser.username} 
    <span>⚙</span>
  </span>

  const Dropdown = () => (
    <ul className='navbar-dropdown'>
      <li className="dropdown-li"><span className="dropdown-item" onClick={handleLogout}>Log out</span></li>
    </ul>
  )

  return <DropdownWrapper 
    containerClass='nav-dropdown-container'
    button={Button}
    dropdown={Dropdown}
  />
}

export default withRouter(AppNavbarDropdown);