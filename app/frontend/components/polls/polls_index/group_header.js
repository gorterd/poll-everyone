import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { graphql, useFragment } from 'react-relay/hooks'
import { clearGroupSelection, receiveGroupSelection } from '../../../store/actions/selection_actions'
import { selectedPollsSelector } from '../../../util/redux_selectors'

const groupHeaderFragment = graphql`
  fragment groupHeader on Group {
    _id
    title
    ord
    numPolls
    pollIds
  }
`

export default function GroupHeader({
  groupRef,
  drawerVisible,
  toggleDrawerVisible,
  addActivity,
  rename,
}) {
  const group = useFragment(groupHeaderFragment, groupRef)
  const dispatch = useDispatch()
  const { _id, title, ord, numPolls } = group
  const checked = useSelector(selectedPollsSelector).groupIds.includes(_id)

  const optionalControls = !!ord && (
    <>
      <li><span className="group-polls-link" onClick={rename}>Rename</span></li>
    </>
  )

  const activitiesCount = `${numPolls} activit${(numPolls == 1) ? 'y' : 'ies'}`

  const handleCheckbox = e => e.target.checked
    ? dispatch(receiveGroupSelection(group))
    : dispatch(clearGroupSelection(group))

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