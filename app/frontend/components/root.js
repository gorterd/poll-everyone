import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './app'
import { QueryClientProvider } from 'react-query'

export default function Root({ store, queryClient }) {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  )
}