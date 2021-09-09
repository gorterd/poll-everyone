import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DropdownWrapper from '../../shared/dropdown'

import { receiveSelections, clearSelections } from '../../../store/actions/selection_actions'
import {
  openModal,
  setStickyToolbar,
} from '../../../store/actions/ui_actions'

import {
  stickyToolbarSelector,
  selectedPollsSelector,
} from '../../../util/redux_selectors'
import { smoothScrollToY } from '../../../util/general_util'
import { useBatchDestroy, useMovePolls } from '../../../hooks/api/mutation'
import { graphql, useFragment } from 'react-relay/hooks'

const pollsIndexToolbarFragment = graphql`
  fragment toolbar on Group @relay(plural: true) {
    _id
    ord
    pollIds
  }
`

const PollsIndexToolbar = ({ toggleMoveDrawer, groupsRef }) => {
  const groups = useFragment(pollsIndexToolbarFragment, groupsRef)

  const intersectionDiv = useRef()
  const dispatch = useDispatch()
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const selectedPolls = useSelector(selectedPollsSelector)
  const { mutate: movePolls } = useMovePolls()
  const { mutate: batchDestroy } = useBatchDestroy()

  const selectedPollIds = selectedPolls.pollIds
  const selectedGroupIds = selectedPolls.groupIds

  useLayoutEffect(() => {
    const div = intersectionDiv.current

    let mostRecent
    const observer = new IntersectionObserver(event => {
      let ts = mostRecent = Date.now()
      setTimeout(() => {
        if (ts === mostRecent) {
          dispatch(setStickyToolbar(!event[0].isIntersecting))
        }
      }, 20)
    }, { threshold: 1 })

    observer.observe(div)
    return () => observer.unobserve(div)
  }, [intersectionDiv, dispatch])

  function openNewGroupModal() {
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

  function selectAll() {
    const groupIds = groups.map(group => group._id)
    const pollIds = groups.reduce((acc, group) => acc.concat(group.pollIds), [])
    dispatch(receiveSelections({ groupIds, pollIds }))
  }

  function ungroup() {
    movePolls({
      pollIds: selectedPollIds,
      groupId: groups.find(g => g.ord === 1)._id
    })
  }

  const Button = () => <span className='button-grey'><i className="fas fa-check"></i></span>

  const Dropdown = () => (
    <ul>
      <span className='button-white' onClick={selectAll}>All</span>
      <span
        className='button-white'
        onClick={() => dispatch(clearSelections())}
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

export default PollsIndexToolbar