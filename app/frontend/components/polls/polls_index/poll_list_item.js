import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDuplicatePoll, useToggleActive } from '../../../util/api/mutation_hooks';
import { selectedPollsSelector } from '../../../util/hooks_selectors';

export default function PollListItem({ poll, togglePollSelect }) {
  const POLL_ICONS = {
    multiple_choice: 'fas fa-spell-check',
  }

  const { mutate: duplicatePoll } = useDuplicatePoll();
  const { mutate: toggleActive } = useToggleActive();
  const selectedPolls = useSelector(selectedPollsSelector)
  const checked = selectedPolls.pollIds.includes(poll.id);
  const activeClass = poll.active ? ' activated' : '';

  const titleText = poll.title.length > 96 
    ? (poll.title.slice(0,92) + '. . .') 
    : poll.title;
  const numResponsesText = poll.numResponses 
    ? `${poll.numResponses} response${poll.numResponses > 1 ? 's' : ''}` 
    : 'No responses';

  const handleCheck = e => togglePollSelect(poll.id, e.target.checked);
  const duplicate = () => duplicatePoll(poll.id);
  const toggle = () => toggleActive(poll.id);

  return (
    <li className={'poll-list-item group-polls-row' + activeClass}>
      <div className='group-row-left'>
        <input type="checkbox" onChange={handleCheck} checked={checked} />
        <span className='poll-list-item-icon'><i className={POLL_ICONS[poll.pollType]}></i></span>
        <Link to={`/polls/${poll.id}/show`} className='group-polls-link'>{titleText}</Link>
      </div>
      <div className="poll-row-right">
        <ul className="poll-row-controls">
          <li> <Link className="group-polls-link" to={`/polls/${poll.id}/edit`}>Edit</Link></li>
          <li> <span className="group-polls-link" onClick={duplicate}>Duplicate</span></li>
        </ul>
        <span className='activate-icon poll-list-item-icon' onClick={toggle}>
          <i className="fas fa-broadcast-tower"></i>
        </span>
        <span className="poll-row-responses">{numResponsesText}</span>
      </div>
    </li>
  )
}