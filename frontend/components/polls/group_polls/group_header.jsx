import React from 'react';

const GroupHeader = ({
  group, drawerVisible, toggleDrawer, selections, receiveGroupSelection, clearGroupSelection, rename, duplicate, addActivity
}) => {

  const {id, title, ord, pollsCount} = group;
  const checked = selections.groupIds.includes(id);

  const optionalControls = (ord == 0) ? null : (
    <>
      <li><span className="group-polls-link" onClick={rename}>Rename</span></li>
      <li><span className="group-polls-link" onClick={duplicate}>Duplicate</span></li>
    </>
  )

  const activitiesCount = `${pollsCount} activit${(pollsCount == 1) ? "y" : "ies"}`

  const handleCheckbox = e => {
    if (e.target.checked) {
      receiveGroupSelection(group);
    } else {
      clearGroupSelection(group);
    }
  }

  return (
    <div className="group-header group-polls-row" onClick={toggleDrawer}>

      <div className="group-row-left">
        <input type="checkbox" onChange={handleCheckbox} onClick={e => e.stopPropagation()} checked={checked}/>
        <span 
          className={"drawer-chevron " + (drawerVisible ? "open-drawer-chevron" : "")}
          ><i className="fas fa-chevron-right"></i>
        </span>
        <span className="group-header-title">{title}</span>
      </div>

      <div className="group-header-right">
        <ul className="group-header-controls">
          <li> <span className="group-polls-link" onClick={addActivity}>Add activity</span></li>
          {optionalControls}
        </ul>
        <span className="group-header-activities">{activitiesCount}</span>
      </div>
      
    </div>
  )
}

export default GroupHeader;

