import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearPollSelection, receivePollSelection } from '../../../store/actions/selection_actions'
import { openModal } from '../../../store/actions/ui_actions'
import { useToggleState } from '../../../hooks/state'
import { stickyToolbarSelector } from '../../../util/redux_selectors'
import GroupHeader from './group_header'
import PollListItem from './poll_list_item'
import { graphql, useFragment } from 'react-relay/hooks'

const groupFragment = graphql`
  fragment groupPollsList on Group {
    _id
    title
    ord
    pollIds
    ...groupHeader

    polls {
      _id
      ...pollListItem
    }
  }
`

const GroupPollsList = ({ groupRef }) => {
  const { polls, ...group } = useFragment(groupFragment, groupRef)

  const dispatch = useDispatch()
  const [drawerVisible, toggleDrawerVisible] = useToggleState(group.ord === 1)
  const stickyToolbar = useSelector(stickyToolbarSelector)

  const addActivity = (e) => {
    e.stopPropagation()

    dispatch(openModal({
      type: 'new-poll',
      data: { group },
      offset: stickyToolbar ? 0 : 72,
    }))
  }

  const rename = (e) => {
    e.stopPropagation()

    dispatch(openModal({
      type: 'edit-group',
      data: { group },
      offset: stickyToolbar ? 70 : 0,
    }))
  }

  const togglePollSelect = (pollId, selected) => {
    if (selected) {
      dispatch(receivePollSelection({ group, pollId }))
    } else {
      dispatch(clearPollSelection({ group, pollId }))
    }
  }

  const headerProps = {
    groupRef: group,
    drawerVisible,
    toggleDrawerVisible,
    addActivity,
    rename,
  }

  return (
    <div className='group-polls-index-container'>
      <GroupHeader {...headerProps} />
      {drawerVisible && (
        <ul className="group-polls-index">
          {polls.map(poll =>
            <PollListItem
              key={poll._id}
              pollRef={poll}
              togglePollSelect={togglePollSelect}
            />
          )}
        </ul>
      )}
    </div>
  )
}

export default GroupPollsList