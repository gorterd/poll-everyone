import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownWrapper from '../../shared/wrappers/dropdown';

import { batchDestroy, movePolls } from "../../../store/actions/group_actions";
import { receiveSelections, clearSelections } from '../../../store/actions/selection_actions/poll_selection_actions'
import { 
  openModal, 
  setStickyToolbar, 
} from '../../../store/actions/ui_actions';

import { 
  stickyToolbarSelector, 
  selectedPollsSelector, 
  orderedGroupsSelector, 
} from '../../../util/hooks_selectors';

export default function GroupsIndexToolbar({ toggleMoveDrawer }) {
  const intersectionDiv = useRef();
  const dispatch = useDispatch();
  const groups = useSelector(orderedGroupsSelector)
  const stickyToolbar = useSelector(stickyToolbarSelector);
  const selectedPolls =  useSelector(selectedPollsSelector)

  const selectedPollIds = selectedPolls.pollIds;
  const selectedGroupIds = selectedPolls.groupIds;

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver( event => {
        dispatch(setStickyToolbar(!event[0].isIntersecting));
      }, {
        threshold: 1
      })
      
      observer.observe(intersectionDiv.current);
      
      return () => {
        if (intersectionDiv.current) observer.unobserve(intersectionDiv.current);
      }
    }
  }, [intersectionDiv])

  function openNewGroupModal(){
    dispatch(openModal({
      type: 'new-group',
      data: selectedPolls,
      offset: stickyToolbar ? 70 : 0,
    }));
  }

  function openNewPoll() {
    if (!stickyToolbar) window.scrollTo(0, 0);
    dispatch(openModal({
      type: 'new-poll',
      data: {},
      offset: stickyToolbar ? 0 : 72,
    }));
  }

  function selectAll(){
    const groupIds = groups.map( group => group.id );
    const pollIds = groups.reduce( (acc, group) => acc.concat(group.pollIds), [] );
    dispatch(receiveSelections({ groupIds, pollIds }));
  }

  function ungroup(){
    dispatch(movePolls(
      selectedPollIds, 
      groups.find( g => g.ord === 0).id)
    );
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

  const noSelection = !(selectedPollIds.length || selectedGroupIds.length); 
  let className = 'groups-index-toolbar';
  if (stickyToolbar) className += ' sticky-toolbar';
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
          onClick={() => dispatch(batchDestroy(selectedPolls))}
        >
          Delete
        </button>
        <button className='button-grey' onClick={toggleMoveDrawer} disabled={noSelection}>Move</button>
      </div>
    </>
  );
};