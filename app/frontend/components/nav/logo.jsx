import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../images/nav/logo.png';

export default function Logo ({path, onClick}) {
  const history = useHistory();
  if (!onClick) onClick = () => history.push(path || '/');

  return (
    <button onClick={onClick} className='logo'>
      <img src={logoImg} alt='Logo' />
      <span>Poll Everyone</span>
    </button>
  );
}