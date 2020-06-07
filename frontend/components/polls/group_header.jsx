import React from 'react';
import { Link } from 'react-router-dom';

const GroupHeader = ({
  group, drawerVisible, toggleDrawer, toggleSelectGroup, rename, duplicate, addActivity
}) => {

  const {title, ord, pollsCount} = group;

  const optionalControls = (ord == 0) ? null : (
    <>
      <li><span className="group-header-link" onClick={rename}>Rename</span></li>
      <li><span className="group-header-link" onClick={duplicate}>Duplicate</span></li>
    </>
  )

  const activitiesCount = `${pollsCount} activit${(pollsCount == 1) ? "y" : "ies"}`

  return (
    <div className="group-header">
      <div className="group-header-left">
        <input type="checkbox" onChange={toggleSelectGroup}/>
        <span 
          className={"drawer-chevron " + (drawerVisible ? "open-drawer-chevron" : "")}
          onClick={toggleDrawer}
          ><i className="fas fa-chevron-right"></i>
        </span>
        <span className="group-header-title">{title}</span>
      </div>
      <div className="group-header-right">
        <ul className="group-header-controls">
          <li> <span className="group-header-link" onClick={addActivity}>Add activity</span></li>
          {optionalControls}
        </ul>
        <span className="group-header-activities">{activitiesCount}</span>
      </div>
      
    </div>
  )
}

export default GroupHeader;

