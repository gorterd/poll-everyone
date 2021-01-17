import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom'
import ParticipantPoll from './participant_poll';
import ParticipantHome from './participant_home';
import logoImg from '../../images/nav/logo.png';

window.here = 'HERE!'
console.log(window.here)

const ParticipantApp = () => {
  return (
    <section className='participant-app'>
      <nav className='participant-navbar'>
        <Link to='/' className='participant-nav-link participant-nav-link-left'>
          <span>Back to Main App</span> 
        </Link>
        <NavLink exact to='/participate' activeClassName='participant-nav-link-active' className='participant-nav-link'>
          <img src={logoImg} alt='Logo' />
          <span>Home</span> 
        </NavLink>
      </nav>
      <Route exact path='/participate'>
        <ParticipantHome />
      </Route>
      <Route path='/participate/:username'>
        <ParticipantPoll />
      </Route>
    </section>
  )
}

export default ParticipantApp;