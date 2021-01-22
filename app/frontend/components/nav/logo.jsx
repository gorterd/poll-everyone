import React from 'react';
import { useHistory } from 'react-router-dom';
import logoImgUrl from '../../images/nav/logo.png';

export default ({ path, onClick }) => {
  const history = useHistory();
  if (!onClick) onClick = () => history.push(path || '/');

  return (
    <button onClick={onClick} className='logo'>
      <img src={logoImgUrl} alt='Logo' />
      <span>Poll Everyone</span>
    </button>
  );
};