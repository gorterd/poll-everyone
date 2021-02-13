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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  }
})

const retrieveCurrentAttributes = root => {
  const id = parseInt(root.getAttribute('data-current-id'))
  root.removeAttribute('data-current-id')
  
  const type = root.getAttribute('data-current-type')
  root.removeAttribute('data-current-type')

  return { id, type }
}

Promise.all([loadFont, loadDOM]).then( () => {
  const root = document.getElementById('root')
  const current = retrieveCurrentAttributes(root)  

  queryClient.setQueryData('current', () => current)
  queryClient.invalidateQueries('current')

  render(<Root store={configureStore()} queryClient={queryClient}/>, root)
})
