import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { exitModal } from '../../../../store/actions/ui_actions';
import { modalSelector } from '../../../../util/hooks_selectors';
import Navbar from '../navbar';
import AppNavbarDropdown from './app_navbar_dropdown';

export default function AppNavbar () {
  const dispatch = useDispatch();
  const modal = useSelector(modalSelector);

  const logoProps = modal.type
    ? { onClick: () => dispatch(exitModal()) }
    : { path: '/polls' }
  const tools = [<AppNavbarDropdown />];
  const links = [
    <NavLink activeClassName="navbar-active" to='/polls'>Polls</NavLink>,
  ];

  const navbarProps = { tools, links, logoProps };
  return <Navbar { ...navbarProps } />
}