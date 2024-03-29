import React, { useCallback } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import ParticipatePresentation from './participate_pres'
import ParticipateHome from './participate_home'
import logoImg from '../../images/nav/logo.png'
import { useDelayedPrefetch } from '../../hooks/effect'
import { fetchFooter, fetchHomeSplash, fetchNavbar } from '../lazy_load_index'

const ParticipateApp = () => {
  const prefetch = useCallback(() => {
    fetchHomeSplash()
    fetchNavbar()
    fetchFooter()
  }, [])

  useDelayedPrefetch(prefetch)

  return (
    <section className='participant-app'>
      <nav className='participant-navbar'>
        <Link to='/' className='participant-nav-link participant-nav-link-left'>
          <span>Back to Main App</span> 
        </Link>
        <NavLink 
          exact 
          to='/participate' 
          activeClassName='participant-nav-link-active' 
          className='participant-nav-link'
        >
          <img src={logoImg} alt='Logo' />
          <span>Home</span> 
        </NavLink>
      </nav>
      <Route exact path='/participate'>
        <ParticipateHome />
      </Route>
      <Route path='/participate/:username'>
        <ParticipatePresentation />
      </Route>
    </section>
  )
}

export default ParticipateApp