import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { duplicatePoll, toggleActive } from '../../../actions/poll_actions';
import { selectedPollsSelector } from '../../../util/hooks_selectors';

export default function PollListItem({ poll, togglePollSelect }) {
  const dispatch = useDispatch();
  const selectedPolls = useSelector(selectedPollsSelector)
  const POLL_ICONS = {
    multiple_choice: 'fas fa-spell-check',
  }

  const checked = useSelector(selectedPollsSelector).pollIds.includes(poll.id);
  const activeClass = poll.active ? ' activated' : '';
  const titleText = poll.title.length > 96 
    ? (poll.title.slice(0,92) + '. . .') 
    : poll.title;
  const numResponsesText = poll.numResponses 
    ? `${poll.numResponses} response${poll.numResponses > 1 ? 's' : ''}` 
    : 'No responses';

  const handleCheck = e => togglePollSelect(poll.id, e.target.checked);
  const duplicate = () => dispatch(duplicatePoll(poll.id));
  const toggle = () => dispatch(toggleActive(poll.id));

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