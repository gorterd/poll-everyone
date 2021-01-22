import React from 'react'
import { render } from 'react-dom'
import Root from '../components/root'
import configureStore from '../store/configure_store';
import WebFont from 'webfontloader';

const loadFont = new Promise( res => {
  WebFont.load({
    google: {
      families: ['Source Sans Pro:400,600,700,900']
    },
    active: res,
    inactive: res,
    timeout: 1000,
  })
});

const loadDOM = new Promise( res => {
  document.addEventListener('DOMContentLoaded', res);
});

Promise.all([loadFont, loadDOM]).then( () => {
  const root = document.getElementById('root');

  const preloadedState = JSON.parse(
    root.getAttribute('data-preloaded-state')
  );
  root.removeAttribute('data-preloaded-state');
  
  render(<Root store={configureStore(preloadedState)}/>, root);
})
