// const componentRequireContext = require.context("components", true);
// const ReactRailsUJS = require("react_ujs");
// ReactRailsUJS.useContext(componentRequireContext);

import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../components/root'

console.log('hello wokjld')

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.querySelector('body').append(root);
  ReactDOM.render(<Root preloadedState={JSON.stringify({})} />, root);
})
