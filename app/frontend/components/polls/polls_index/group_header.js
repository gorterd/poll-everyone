import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGroupSelection, receiveGroupSelection } from '../../../store/actions/selection_actions/poll_selection_actions';
import { selectedPollsSelector } from '../../../util/hooks_selectors';

export default function GroupHeader({
  group,
  drawerVisible,
  toggleDrawerVisible,
  addActivity,
  rename,
}) {
  const dispatch = useDispatch();
  const { id, title, ord, pollIds } = group;
  const checked = useSelector(selectedPollsSelector).groupIds.includes(id);
  const pollsCount = pollIds.length;

  const optionalControls = !!ord && (
    <>
      <li><span className="group-polls-link" onClick={rename}>Rename</span></li>
    </>
  );

  const activitiesCount = `${pollsCount} activit${(pollsCount == 1) ? 'y' : 'ies'}`

  function handleCheckbox(e) {
    if (e.target.checked) {
      dispatch(receiveGroupSelection(group));
    } else {
      dispatch(clearGroupSelection(group));
    }
  }

  return (
    <div className="group-header group-polls-row" onClick={toggleDrawerVisible}>

      <div className="group-row-left">
        <input type="checkbox" onChange={handleCheckbox} onClick={e => e.stopPropagation()} checked={checked}/>
        <span 
          className={'drawer-chevron ' + (drawerVisible ? 'open-drawer-chevron' : '')}
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