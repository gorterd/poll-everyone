import React from 'react'
import { render } from 'react-dom'
import { QueryClient } from 'react-query'

import Root from '../components/root'
import configureStore from '../store/configure_store'
import WebFont from 'webfontloader'

const loadFont = new Promise( res => {
  WebFont.load({
    google: {
      families: ['Source Sans Pro:400,600,700,900']
    },
    active: res,
    inactive: res,
    timeout: 1000,
  })
})

const loadDOM = new Promise( res => {
  document.addEventListener('DOMContentLoaded', res)
})

const queryClient = new QueryClient()

Promise.all([loadFont, loadDOM]).then( () => {
  const root = document.getElementById('root')

  const currentId = root.getAttribute('data-current-id')
  root.removeAttribute('data-current-id')
  console.log('current', currentId)
  queryClient.setQueryData('currentUser', () => (
    currentId 
      ? { id: currentId }
      : { }
  ))
  render(<Root store={configureStore()} queryClient={queryClient}/>, root)
})
