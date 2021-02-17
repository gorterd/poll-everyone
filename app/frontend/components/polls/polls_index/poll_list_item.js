import React from 'react'
import { useSelector } from 'react-redux'
import { graphql, useFragment } from 'react-relay/hooks'
import { Link } from 'react-router-dom'
import { useDuplicatePoll, useToggleActive } from '../../../hooks/api/mutation'
import { selectedPollsSelector } from '../../../util/redux_selectors'

const pollListItemFragment = graphql`
  fragment pollListItem on Poll {
    _id
    title
    active
    ord
    numResponses
    pollType
  }
`
const POLL_ICONS = {
  multiple_choice: 'fas fa-spell-check',
}

export default function PollListItem({ pollRef, togglePollSelect }) {
  const poll = useFragment(pollListItemFragment, pollRef)

  const { mutate: duplicatePoll } = useDuplicatePoll()
  const { mutate: toggleActive } = useToggleActive()
  const selectedPolls = useSelector(selectedPollsSelector)
  const checked = selectedPolls.pollIds.includes(poll._id)
  const activeClass = poll.active ? ' activated' : ''

  const titleText = poll.title.length > 96 
    ? (poll.title.slice(0,92) + '. . .') 
    : poll.title
  const numResponsesText = poll.numResponses 
    ? `${poll.numResponses} response${poll.numResponses > 1 ? 's' : ''}` 
    : 'No responses'

  const handleCheck = e => togglePollSelect(poll._id, e.target.checked)
  const duplicate = () => duplicatePoll(poll._id)
  const toggle = () => toggleActive(poll._id)

  return (
    <li className={'poll-list-item group-polls-row' + activeClass}>
      <div className='group-row-left'>
        <input type="checkbox" onChange={handleCheck} checked={checked} />
        <span className='poll-list-item-icon'>
          <i className={POLL_ICONS[poll.pollType]}></i>
        </span>
        <Link 
          to={`/polls/${poll._id}/show`} 
          className='group-polls-link'
        >{titleText}</Link>
      </div>
      <div className="poll-row-right">
        <ul className="poll-row-controls">
          <li> 
            <Link 
              to={`/polls/${poll._id}/edit`}
              className="group-polls-link" 
            >Edit</Link>
          </li>
          <li> 
            <span 
              className="group-polls-link" 
              onClick={duplicate}
            >Duplicate</span>
          </li>
        </ul>
        <span className='activate-icon poll-list-item-icon' onClick={toggle}>
          <i className="fas fa-broadcast-tower"></i>
        </span>
        <span className="poll-row-responses">{numResponsesText}</span>
      </div>
    </li>
  )
}