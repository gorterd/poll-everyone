import React from 'react';
import { Link } from 'react-router-dom';

const PollListItem = ({ poll, togglePollSelect, selections, duplicatePoll }) => {
  const checked = selections.pollIds.includes(poll.id);

  const POLL_ICONS = {
    "multiple_choice": 'fas fa-spell-check',
  }

  return (
    <li className='poll-list-item group-polls-row'>
      <div className='group-row-left'>
        <input type="checkbox" onChange={e => togglePollSelect(poll.id, e.target.checked)} checked={checked} />
        <span className='poll-type-icon'><i className={POLL_ICONS[poll.pollType]}></i></span>
        <Link to={`/polls/${poll.id}/edit`} className='group-polls-link'>{poll.title}</Link>
      </div>
      <div className="poll-row-right">
        <ul className="poll-row-controls">
          <li> <Link className="group-polls-link" to={`/polls/${poll.id}/edit`}>Edit</Link></li>
          <li> <span className="group-polls-link" onClick={() => duplicatePoll(poll.id)}>Duplicate</span></li>
        </ul>
        <span className="poll-row-responses">No responses</span>
      </div>
    </li>
  )
}

export default PollListItem;