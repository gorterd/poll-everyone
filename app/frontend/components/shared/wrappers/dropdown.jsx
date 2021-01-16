import React from 'react';
import { useDropdown } from '../../../util/custom_hooks';

export default function DropdownWrapper({
  button: Button,
  dropdown: Dropdown,
  buttonProps,
  dropdownProps,
  containerClass
}) {

  const {
    dropdownShowing,
    hideDropdown,
    toggleDropdown
  } = useDropdown();

  const handleClick = e => {
    e.stopPropagation();
    toggleDropdown();
  }

  return (
    <div className={"dropdown-container " + containerClass}>
      <div onClick={handleClick} className='dropdown-button'> 
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