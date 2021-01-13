import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../../store/actions/group_actions';
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

  useEffect( () => {
    if (moveDrawerVisible && stickyToolbar) {
      scrollTo({ top: 72, behavior: "smooth" });
    }
  }, [moveDrawerVisible]);

  function toggleMoveDrawer() {
    setMoveDrawerVisible( oldVal => !oldVal );
  }
    
  return (
    <section className="polls-index">

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