import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useRef, useEffect } from 'react'

import { openModal, exitModal } from '../../../store/actions/ui_actions'
import { selectedPollsSelector, stickyToolbarSelector } from '../../../util/redux_selectors'
import GroupSearch from '../../shared/group_search'
import { useMovePolls } from '../../../hooks/api/mutation'
import { usePolls } from '../../../hooks/api/query'
import { pollDataOrderedGroupsSelector } from '../../../util/query_selectors'

export default function MoveDrawer({ visible, toggleVisible }) {
  const dispatch = useDispatch()
  const selectedPolls = useSelector(selectedPollsSelector)
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const [ group, setGroup ] = useState(undefined)
  const { data: groups = [] } = usePolls({ select: pollDataOrderedGroupsSelector })
  const { mutateAsync: movePolls } = useMovePolls()
  const groupSearchKey = useRef(0)
  const moveButton = useRef()
  const cancelButton = useRef()

  const pollIds = selectedPolls.pollIds
  const numPolls = pollIds.length

  function handleMove(){
    const groupId = group?.id || groups.find(group => group.ord === 1 ).id
    const sendMoveRequest = () => {
      return movePolls({pollIds, groupId}).then( () => {
        dispatch(exitModal())
        toggleVisible()
        setGroup(undefined)
      })
    }
    
    dispatch(openModal({
      type: 'confirm-move',
      data: { sendMoveRequest, numPolls },
      offset: stickyToolbar ? 70 : 0,
    }))
  }

  const buttonText = `Apply to ${numPolls} poll${numPolls === 1 ? '' : 's'}`
  const disabled = !group || numPolls === 0

  useEffect(() => {
    if (!visible) groupSearchKey.current += 1
  }, [visible])

  return (
    <div className='move-drawer-anchor'>
      <div className={'move-drawer-container' + ( visible ? ' open' : '')}>
        <div className='move-drawer-wrapper'>
          <h1>Move</h1>

          <div className='move-drawer-search-container'>
            <span>To another group: </span>
            <GroupSearch
              key={groupSearchKey.current}
              setGroup={setGroup}
              groups={groups}
              placeholderText='Search group name'
              focusOnTab={ disabled ? cancelButton.current : moveButton.current }
            />
          </div>

          <div className='move-buttons'>
            <button 
              className='button-blue' 
              onClick={handleMove} 
              ref={moveButton}
              disabled={disabled}
            >
              {buttonText}
            </button>

            <button 
              className='button-transparent' 
              onClick={toggleVisible}
              ref={cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}