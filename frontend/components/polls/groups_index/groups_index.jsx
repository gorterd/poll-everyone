import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../../actions/group_actions';
import { openModal } from '../../../actions/ui_actions';
import GroupsIndexToolbar from './groups_index_toolbar';
import MoveDrawer from './move_drawer';
import GroupPollsIndex from '../group_polls/group_polls_index';
import { 
  currentUserIdSelector, 
  orderedGroupsSelector, 
  stickyToolbarSelector 
} from '../../../util/hooks_selectors';

export default function GroupsIndex(props) {
  const dispatch = useDispatch();
  const [ moveDrawerVisible, setMoveDrawerVisible ] = useState(false);
  const groups = useSelector(orderedGroupsSelector)
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const currentId = useSelector(currentUserIdSelector)

  useEffect( () => {
    dispatch(fetchGroups(currentId));
  }, []);

  function toggleMoveDrawer() {
    if (stickyToolbar) scrollTo({top: 75, behavior: "smooth"});
    setMoveDrawerVisible( oldVal => !oldVal );
  }

  function openNewPoll() {
    dispatch(openModal({
      type: 'new-poll',
      data: {},
      offset: 72
    }));
  }
    
  return (
    <section className="polls-index">

      {/* <aside className='polls-sidebar'>
        <button 
          className={'button-blue' + (stickyToolbar ? ' hidden' : '') }
          onClick={openNewPoll}
        >Create</button>
      </aside> */}

      <GroupsIndexToolbar 
        toggleMoveDrawer={toggleMoveDrawer}
      />
      <section className='groups-index-container'>

        <MoveDrawer 
          visible={moveDrawerVisible} 
          toggleVisible={toggleMoveDrawer} 
        /> 

        <div className='groups-index'>
          {groups.map( group => {
            return <GroupPollsIndex 
              key={group.id} 
              group={group} 
            />
          })}
        </div>
      </section>
    </section>
  );
};