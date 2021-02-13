import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DropdownWrapper from '../../shared/wrappers/dropdown'

import { receiveSelections, clearSelections } from '../../../store/actions/selection_actions'
import { 
  openModal, 
  setStickyToolbar, 
} from '../../../store/actions/ui_actions'

import { 
  stickyToolbarSelector, 
  selectedPollsSelector, 
} from '../../../util/hooks_selectors'
import { smoothScrollToY } from '../../../util/general_util'
import { useBatchDestroy, useMovePolls } from '../../../util/api/mutation_hooks'
import { usePollData } from '../../../hooks/api/query'
import { pollDataOrderedGroupsSelector } from '../../../util/query_selectors'

export default function GroupsIndexToolbar({ toggleMoveDrawer }) {
  const intersectionDiv = useRef()
  const dispatch = useDispatch()
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const selectedPolls =  useSelector(selectedPollsSelector)
  const { data: groups } = usePollData({ select: pollDataOrderedGroupsSelector})
  const { mutate: movePolls } = useMovePolls()
  const { mutate: batchDestroy } = useBatchDestroy()

  const selectedPollIds = selectedPolls.pollIds
  const selectedGroupIds = selectedPolls.groupIds
  
  useLayoutEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver( event => {
        dispatch(setStickyToolbar(!event[0].isIntersecting))
      }, { threshold: 1 })

      const div = intersectionDiv.current
      observer.observe(div)
      return () => observer.unobserve(div)
    }
  }, [dispatch, intersectionDiv])

  function openNewGroupModal(){
    dispatch(openModal({
      type: 'new-group',
      data: selectedPolls,
      offset: stickyToolbar ? 70 : 0,
    }))
  }

  async function openNewPoll() {
    if (!stickyToolbar) await smoothScrollToY(0, { pause: 75 })
    dispatch(openModal({
      type: 'new-poll',
      data: {},
      offset: stickyToolbar ? 0 : 72
    }))
  }

  function selectAll(){
    const groupIds = groups.map( group => group.id )
    const pollIds = groups.reduce( (acc, group) => acc.concat(group.pollIds), [] )
    dispatch(receiveSelections({ groupIds, pollIds }))
  }

  function ungroup(){
    movePolls({
      pollIds: selectedPollIds,
      groupId: groups.find(g => g.ord === 0).id
    })
  }

  const Button = () => <span className='button-grey'><i className="fas fa-check"></i></span>

  const Dropdown = () => (
    <ul>
      <span className='button-white' onClick={selectAll}>All</span>
      <span 
        className='button-white' 
        onClick={ () => dispatch(clearSelections()) }
      >None</span>
    </ul>
  )

  const noSelection = !(selectedPollIds.length || selectedGroupIds.length) 
  let className = 'groups-index-toolbar'
  if (stickyToolbar) {
    className += ' sticky-toolbar'
  }
  return (
    <>
      <div ref={intersectionDiv}></div>
      <div className={className}>
        <div className='polls-sidebar'>
          <button
            className='button-blue'
            onClick={openNewPoll}
          >
            Create
          </button>
        </div>

        <DropdownWrapper button={Button} dropdown={Dropdown} containerClass='group-select-dropdown' />

        <button className='button-grey' onClick={openNewGroupModal}>New group</button>
        <button className='button-grey' onClick={ungroup} disabled={noSelection}>Ungroup</button>
        <button
          className='button-grey'
          disabled={noSelection}
          onClick={() => batchDestroy(selectedPolls)}
        >
          Delete
        </button>
        <button className='button-grey' onClick={toggleMoveDrawer} disabled={noSelection}>Move</button>
      </div>
    </>
  )
}