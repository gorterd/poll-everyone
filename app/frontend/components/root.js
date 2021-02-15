import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './app'
import { QueryClientProvider } from 'react-query'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import environment from '../relay/environment'

const Root = ({ store, queryClient }) => 
  <RelayEnvironmentProvider environment={environment}>
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  </RelayEnvironmentProvider>

export default Root