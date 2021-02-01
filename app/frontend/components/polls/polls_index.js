import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GroupsIndexToolbar from './polls_index/toolbar';
import MoveDrawer from './polls_index/move_drawer';
import GroupPollsIndex from './polls_index/group_polls_list';
import { 
  stickyToolbarSelector 
} from '../../util/hooks_selectors';
import { useDelayedPrefetch, useToggleState } from '../../util/custom_hooks';
import { fetchEditPoll, fetchHomeSplash, fetchPresentPoll } from '../lazy_load_index';
import { usePollData } from '../../util/api/query_hooks';
import { pollDataSelector } from '../../util/query_selectors';

export default function GroupsIndex() {
  useDelayedPrefetch(
    fetchHomeSplash,
    fetchEditPoll,
    fetchPresentPoll
  );

  const [ moveDrawerVisible, toggleMoveDrawerVisible ] = useToggleState(false);
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const { data } = usePollData({ select: pollDataSelector });

  useEffect( () => {
    if (moveDrawerVisible && stickyToolbar) {
      window.scrollTo({ top: 72, behavior: "smooth" });
    }
  }, [moveDrawerVisible]);

  return (
    <section className="polls-index">

      <GroupsIndexToolbar 
        toggleMoveDrawer={toggleMoveDrawerVisible}
      />
      <section className='groups-index-container'>

        <MoveDrawer 
          visible={moveDrawerVisible} 
          toggleVisible={toggleMoveDrawerVisible} 
        /> 

        <div className='groups-index'>
          {data?.map( ({ group, polls }) => {
            return <GroupPollsIndex 
              key={group.id} 
              group={group} 
              polls={polls}
            />
          })}
        </div>
      </section>
    </section>
  );
};