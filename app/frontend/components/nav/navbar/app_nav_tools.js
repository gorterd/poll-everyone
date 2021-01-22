import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/actions/session_actions';
import { currentUserSelector } from '../../../util/hooks_selectors';
import DropdownWrapper from '../../shared/wrappers/dropdown';

export default function AppNavbarTools () {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const handleLogout = () => {
    dispatch(logout());
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

  return (
    <li>
      <DropdownWrapper 
        containerClass='nav-dropdown-container'
        button={Button}
        dropdown={Dropdown}
      />
    </li>
  )
}

