import React from 'react';
import { useDropdown } from '../../../util/custom_hooks';

export default function DropdownWrapper({
  button: Button,
  dropdown: Dropdown,
  buttonProps,
  dropdownProps,
  containerClass
}) {

  const [dropdownShowing, dropdownRef, {
    toggleDropdown,
    hideDropdown,
  }] = useDropdown();

  return (
    <div className={"dropdown-container " + containerClass} ref={dropdownRef}>
      <div onClick={toggleDropdown} className='dropdown-button'> 
        <Button {...buttonProps} />
      </div>
      { dropdownShowing && (
        <div className="dropdown" onClick={hideDropdown}> 
          <Dropdown  {...dropdownProps}/> 
        </div>
      )}
    </div>
  )
}