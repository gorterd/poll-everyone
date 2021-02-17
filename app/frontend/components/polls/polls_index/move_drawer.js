import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useRef, useEffect } from 'react'

import { openModal, exitModal } from '../../../store/actions/ui_actions'
import { selectedPollsSelector, stickyToolbarSelector } from '../../../util/redux_selectors'
import GroupSearch from '../../shared/group_search'
import { useMovePolls } from '../../../hooks/api/mutation'
import { graphql, useFragment } from 'react-relay/hooks'

const moveDrawerFragment = graphql`
  fragment moveDrawer on Group @relay(plural: true) {
    _id
    ord
    ...groupSearch
  }
`

export default function MoveDrawer({ visible, toggleVisible, groupsRef }) {
  const groups = useFragment(moveDrawerFragment, groupsRef)
  const dispatch = useDispatch()
  const selectedPolls = useSelector(selectedPollsSelector)
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const [ group, setGroup ] = useState(undefined)
  const { mutateAsync: movePolls } = useMovePolls()
  const groupSearchKey = useRef(0)
  const moveButton = useRef()
  const cancelButton = useRef()

  const pollIds = selectedPolls.pollIds
  const numPolls = pollIds.length

  function handleMove(){
    const groupId = group?._id || groups.find(group => group.ord === 1 )._id
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
              groupsRef={groups}
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