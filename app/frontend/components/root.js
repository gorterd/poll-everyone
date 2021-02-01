import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function Root ({ store }) {
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