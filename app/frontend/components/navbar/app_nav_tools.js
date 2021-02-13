import React from 'react'
import { useLogout } from '../../hooks/api/mutation'
import { useCurrent } from '../../hooks/api/query'
import DropdownWrapper from '../wrappers/dropdown'

export default function AppNavbarTools() {
  const { data: currentUser } = useCurrent()
  const { mutate: logout } = useLogout()

  const Button = () => <span className='nav-tool'>
    {currentUser.username} 
    <span>⚙</span>
  </span>

  const Dropdown = () => (
    <ul className='navbar-dropdown'>
      <li className="dropdown-li">
        <span className="dropdown-item" onClick={logout}>Log out</span>
      </li>
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

