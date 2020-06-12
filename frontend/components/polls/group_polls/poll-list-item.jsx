import React from 'react';
import { Link } from 'react-router-dom';

const PollListItem = ({ 
  poll, togglePollSelect, selections, duplicatePoll, toggleActive } ) => {
  
  const checked = selections.pollIds.includes(poll.id);

  const POLL_ICONS = {
    "multiple_choice": 'fas fa-spell-check',
  }

  const activeClass = poll.active ? ' activated' : '';
  const titleText = poll.title.length > 96 ? (poll.title.slice(0,92) + '. . .') : poll.title

  return (
    <li className={'poll-list-item group-polls-row' + activeClass}>
      <div className='group-row-left'>
        <input type="checkbox" onChange={e => togglePollSelect(poll.id, e.target.checked)} checked={checked} />
        <span className='poll-list-item-icon'><i className={POLL_ICONS[poll.pollType]}></i></span>
        <Link to={`/polls/${poll.id}/show`} className='group-polls-link'>{titleText}</Link>
      </div>
      <div className="poll-row-right">
        <ul className="poll-row-controls">
          <li> <Link className="group-polls-link" to={`/polls/${poll.id}/edit`}>Edit</Link></li>
          <li> <span className="group-polls-link" onClick={() => duplicatePoll(poll.id)}>Duplicate</span></li>
        </ul>
        <span className='activate-icon poll-list-item-icon' onClick={() => toggleActive(poll.id)}>
          <i className="fas fa-broadcast-tower"></i>
        </span>
        <span className="poll-row-responses">No responses</span>
      </div>
    </li>
  )
}

export default PollListItem;