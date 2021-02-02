import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearPollSelection, receivePollSelection } from '../../../store/actions/selection_actions/poll_selection_actions'
import { openModal } from '../../../store/actions/ui_actions'
import { useToggleState } from '../../../hooks/state'
import { stickyToolbarSelector } from '../../../util/redux_selectors'
import GroupHeader from './group_header'
import PollListItem from './poll_list_item'

export default function GroupPollsIndex ({ group, polls }) {
  const dispatch = useDispatch()
  const [drawerVisible, toggleDrawerVisible ] = useToggleState(!group.ord)
  const stickyToolbar = useSelector(stickyToolbarSelector)

  function addActivity(e) {
    e.stopPropagation()
    
    dispatch( openModal({
      type: 'new-poll', 
      data: { group }, 
      offset: stickyToolbar ? 0 : 72,
    }))
  }

  function rename(e) {
    e.stopPropagation()

    dispatch( openModal({
      type: 'edit-group',
      data: { group },
      offset: stickyToolbar ? 70: 0,
    }))
  }

  function togglePollSelect(pollId, selected) {
    if (selected) {
      dispatch(receivePollSelection({ group, pollId }))
    } else {
      dispatch(clearPollSelection({ group, pollId}))
    }
  }

  const headerProps = {
    group, 
    drawerVisible,
    toggleDrawerVisible,
    addActivity,
    rename,
  }

  return (
    <div className='group-polls-index-container'>
      <GroupHeader {...headerProps} />
      { drawerVisible && (
        <ul className="group-polls-index">
          { polls?.map( poll => {
            return <PollListItem 
              key={poll.id} 
              poll={poll} 
              togglePollSelect={togglePollSelect}
            />
          })}
        </ul>
      )}
    </div>
  )
}