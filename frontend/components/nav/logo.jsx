import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logo ({path, onClick}) {
  const history = useHistory();
  if (!onClick) onClick = () => history.push(path || '/');

  return (
    <button onClick={onClick} className='logo'>
      <img src={window.logoURL} alt='Logo' />
      <span>Poll Everyone</span>
    </button>
  );
}