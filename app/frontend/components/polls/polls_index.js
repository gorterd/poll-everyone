import React, { useCallback, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import GroupsIndexToolbar from './polls_index/toolbar'
import MoveDrawer from './polls_index/move_drawer'
import GroupPollsIndex from './polls_index/group_polls_list'
import { 
  stickyToolbarSelector 
} from '../../util/redux_selectors'
import { useDelayedPrefetch } from '../../hooks/effect'
import { usePrevious } from '../../hooks/general'
import { useToggleState } from '../../hooks/state'
import { fetchEditPoll, fetchHomeSplash, fetchPresentPoll } from '../lazy_load_index'
import { usePolls } from '../../hooks/api/query'
import { pollDataSelector } from '../../util/query_selectors'

export default function GroupsIndex() {
  const prefetch = useCallback(() => {
    fetchHomeSplash()
    fetchEditPoll()
    fetchPresentPoll()
  }, [])

  useDelayedPrefetch(prefetch)

  const [ moveDrawerVisible, toggleMoveDrawerVisible ] = useToggleState(false)
  const previousDrawerVisibility = usePrevious(moveDrawerVisible)
  const stickyToolbar = useSelector(stickyToolbarSelector)
  const { data = [] } = usePolls({ select: pollDataSelector })

  useLayoutEffect( () => {
    if (moveDrawerVisible && !previousDrawerVisibility && stickyToolbar) {
      window.scrollTo({ top: 72, behavior: 'smooth' })
    }
  }, [moveDrawerVisible, previousDrawerVisibility, stickyToolbar])

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
  )
}