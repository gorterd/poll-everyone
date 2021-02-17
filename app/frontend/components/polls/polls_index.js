import React, { useCallback, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import PollsIndexToolbar from './polls_index/toolbar'
import MoveDrawer from './polls_index/move_drawer'
import GroupPollsList from './polls_index/group_polls_list'
import { stickyToolbarSelector } from '../../util/redux_selectors'
import { useDelayedPrefetch } from '../../hooks/effect'
import { useFreshLazyLoadQuery, usePrevious } from '../../hooks/general'
import { useToggleState } from '../../hooks/state'
import { fetchEditPoll, fetchHomeSplash, fetchPresentPoll } from '../lazy_load_index'
import { graphql } from 'react-relay/hooks'

export const pollsIndexQuery = graphql`
  query pollsIndexQuery {
    groups {
      _id
      ...groupPollsList
      ...moveDrawer
      ...toolbar
    }
  }
`

const PollsIndex = () => {
  const prefetch = useCallback(() => {
    fetchHomeSplash()
    fetchEditPoll()
    fetchPresentPoll()
  }, [])
  useDelayedPrefetch(prefetch)

  const { groups } = useFreshLazyLoadQuery(pollsIndexQuery)

  const [ moveDrawerVisible, toggleMoveDrawerVisible ] = useToggleState(false)
  const previousDrawerVisibility = usePrevious(moveDrawerVisible)
  const stickyToolbar = useSelector(stickyToolbarSelector)

  useLayoutEffect( () => {
    if (moveDrawerVisible && !previousDrawerVisibility && stickyToolbar) {
      window.scrollTo({ top: 72, behavior: 'smooth' })
    }
  }, [moveDrawerVisible, previousDrawerVisibility, stickyToolbar])

  return (
    <section className="polls-index">
      <PollsIndexToolbar 
        toggleMoveDrawer={toggleMoveDrawerVisible}
        groupsRef={groups}
      />
      <section className='groups-index-container'>

        <MoveDrawer 
          visible={moveDrawerVisible} 
          toggleVisible={toggleMoveDrawerVisible} 
          groupsRef={groups}
        /> 

        <div className='groups-index'>
          {groups.map(group => 
            <GroupPollsList key={group._id} groupRef={group} />
          )}
        </div>
      </section>
    </section>
  )
}

export default PollsIndex