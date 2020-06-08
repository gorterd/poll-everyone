import React from 'react';

const PollListItem = ({ poll, togglePollSelect, selections }) => {
  const checked = selections.pollIds.includes(poll.id);

  const POLL_ICONS = {
    "multiple_choice": 'fas fa-spell-check',
  }

  return (
    <li className='poll-list-item group-polls-row'>
      <div className='group-row-left'>
        <input type="checkbox" onChange={e => togglePollSelect(poll.id, e.target.checked)} checked={checked} />
        <span className='poll-type-icon'><i className={POLL_ICONS[poll.pollType]}></i></span>
        <span className='group-polls-link'>{poll.title}</span>
      </div>
    </li>
  )
}

export default PollListItem;