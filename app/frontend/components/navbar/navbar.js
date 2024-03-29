import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { exitModal } from '../../store/actions/ui_actions'
import { modalSelector } from '../../util/redux_selectors'
import Logo from '../shared/logo'
import AppNavTools from './app_nav_tools'
import HomeNavTools from './home_nav_tools'
import { useLoggedIn } from '../../hooks/api/query'

export default function Navbar() {
  const dispatch = useDispatch()
  const homeMatch = useRouteMatch({ path: '/', exact: true })
  const appMatch = useRouteMatch(['/polls', '/reports'])
  const loggedIn = useLoggedIn()
  const modal = useSelector(modalSelector)

  let NavLinks, NavTools = [null, null]
  let logoProps = {}
  let klass = 'nav-sticky'

  if (appMatch && loggedIn) {
    NavLinks = (
      <li>
        <NavLink activeClassName="navbar-active" to='/polls'>Polls</NavLink>
      </li>
    )
    NavTools = <AppNavTools />

    klass = ''
    if (modal.type) {
      logoProps = { onClick: () => dispatch(exitModal()) }
    }
  } else if (homeMatch) {
    NavLinks = (
      <>
        <li key='github'>
          <a
            className="nav-link"
            href="https://github.com/gorterd"
            target="_blank" rel="noreferrer"
          >Github</a>
        </li>
        <li key='linked-in'>
          <a
            className="nav-link"
            href="https://www.linkedin.com/in/daniel-gorter-87549277"
            target="_blank" rel="noreferrer"
          >LinkedIn</a>
        </li>
      </>
    )
    NavTools = <HomeNavTools />
  }

  return (
    <nav className={'nav ' + klass}>
      <ul className="nav-links">
        <li><Logo {...logoProps} /></li>
        {NavLinks}
      </ul>
      <div className='nav-tools-container'>
        <div className='nav-triangle' />
        <ul className="nav-tools">
          {NavTools}
        </ul>
      </div>
    </nav>
  )
}