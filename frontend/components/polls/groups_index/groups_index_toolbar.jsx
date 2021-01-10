import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';

import DropdownWrapper from '../../shared/dropdown';
import NewPollToolbar from '../modals/new_poll/new_poll_toolbar';

import { batchDestroy, movePolls } from "../../../actions/group_actions";
import { receiveSelections, clearSelections } from '../../../actions/selection_actions/poll_selection_actions'
import { 
  openModal, 
  setStickyToolbar, 
  clearStickyToolbar 
} from '../../../actions/ui_actions';

import { 
  modalTypeSelector, 
  stickyToolbarSelector, 
  selectedPollsSelector, 
  orderedGroupsSelector, 
  modalExitingSelector
} from '../../../util/hooks_selectors';

export default function GroupsIndexToolbar({ toggleMoveDrawer }) {
  // const [ sticky, setSticky ] = useState(false);
  const intersectionDiv = useRef();
  const dispatch = useDispatch();
  const groups = useSelector(orderedGroupsSelector)
  const modalType = useSelector(modalTypeSelector);
  const modalExiting = useSelector(modalExitingSelector);
  const stickyToolbar = useSelector(stickyToolbarSelector);
  const selectedPolls =  useSelector(selectedPollsSelector)
  // const OFFSET = 78;

  const selectedPollIds = selectedPolls.pollIds;
  const selectedGroupIds = selectedPolls.groupIds;

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver( event => {
        // console.log(event)
        // setSticky(!event[0].isIntersecting)
        dispatch(setStickyToolbar(!event[0].isIntersecting));
        // if (event[0].isIntersecting) {
        // } else {
        //   dispatch(clearStickyToolbar());
        // }
      }, {
        threshold: 1
      })
      
      observer.observe(intersectionDiv.current);

      return () => observer.unobserve();
    }
  }, [intersectionDiv])
  
  // useEffect(() => {
  //   const scrollListener = window.addEventListener(
  //     'scroll', 
  //     throttle(() => setScrollY(window.scrollY), 16)
  //   );

  //   return () => window.removeEventListener('scroll', scrollListener);
  // }, []);

  // useEffect(() => {
  //   const nowSticky = OFFSET < scrollY;
  //   if (!stickyToolbar && nowSticky) {
  //     dispatch(setStickyToolbar(56));
  //   } else if (stickyToolbar && !(nowSticky || modalType)) {
  //     dispatch(clearStickyToolbar());
  //   }
  // }, [stickyToolbar, scrollY]);

  function openNewGroupModal(){
    dispatch(openModal({
      type: 'new-group',
      data: selectedPolls,
      offset: 0
      // offset: stickyToolbar
    }));
  }

  function openNewPoll() {
    dispatch(openModal({
      type: 'new-poll',
      data: {},
      offset: 0
      // offset: stickyToolbar
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
  // const showNewPoll = modalType == 'new-poll' && !modalExiting;
  const showNewPoll = modalType == 'new-poll' && !modalExiting;
    console.log(modalType, modalExiting, stickyToolbar);
  // const createButton = !!stickyToolbar && ( 
  const createButton = ( 
    <div className='polls-sidebar'>
      <button 
        className='button-blue' 
        onClick={openNewPoll}
      >
        Create
      </button>
    </div>
  );

  const toolbar = showNewPoll 
    ? <NewPollToolbar /> 
    : (
      <>
        {createButton}

        <DropdownWrapper button={Button} dropdown={Dropdown} containerClass='group-select-dropdown' />

        <button className='button-grey' onClick={openNewGroupModal}>New group</button>
        <button className='button-grey' onClick={ungroup} disabled={noSelection}>Ungroup</button>
        <button 
          className='button-grey' 
          disabled={noSelection}
          onClick={ () => dispatch(batchDestroy(selectedPolls)) }
        >
          Delete
        </button>
        <button className='button-grey' onClick={toggleMoveDrawer} disabled={noSelection}>Move</button>
      </>
    );

  let className = 'groups-index-toolbar';
  if (stickyToolbar && !showNewPoll) className += ' sticky-toolbar';
  // if (stickyToolbar && showNewPoll) className += ' sticky-toolbar-new-poll';

  return (
    <>
      <div ref={intersectionDiv}></div>
      <div className={className}>{toolbar}</div>
    </>
  );
};