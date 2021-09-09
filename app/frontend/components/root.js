import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { RelayEnvironmentProvider } from 'react-relay'
import environment from '../util/relay_environment'
import AppStateWrapper from './app_state_wrapper'
import App from './app'

const Root = ({ store, queryClient }) =>
  <RelayEnvironmentProvider environment={environment}>
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <AppStateWrapper>
            <App />
          </AppStateWrapper>
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  </RelayEnvironmentProvider>

export default Root


