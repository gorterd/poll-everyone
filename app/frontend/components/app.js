import React, { Suspense, memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { AuthRoute, ProtectedRoute } from './shared/routes'
import { Modal } from './shared/modal'

import { componentDoneLoading, componentLoading } from '../store/actions/ui_actions'
import {
  Navbar,
  Footer,
  EditPoll,
  Login,
  ParticipateApp,
  HomeSplash,
  SignupSplash,
  Signup,
  PollsIndex,
  PresentPoll
} from './lazy_load_index'

const Fallback = ({ componentName }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(componentLoading(componentName))
    return () => dispatch(componentDoneLoading())
  }, [componentName, dispatch])

  return null
}


export default memo(function App() {
  return (
    <Suspense fallback={<Fallback componentName='app' />}>
      <Switch>
        <Route path='/participate'>
          <ParticipateApp />
        </Route>
        <>
          <section className='content'>
            <Navbar />

            <Suspense fallback={<Fallback componentName='content' />}>
              <Route exact path='/'>
                <HomeSplash />
              </Route>

              <AuthRoute path='/login'>
                <Login />
              </AuthRoute>

              <AuthRoute path='/signup/splash'>
                <SignupSplash />
              </AuthRoute>

              <AuthRoute path='/signup/create'>
                <Signup />
              </AuthRoute>

              <ProtectedRoute exact path='/polls'>
                <PollsIndex />
              </ProtectedRoute>

              <ProtectedRoute path='/polls/:pollId/edit'>
                <EditPoll />
              </ProtectedRoute>

              <ProtectedRoute path='/polls/:pollId/show'>
                <PresentPoll />
              </ProtectedRoute>
            </Suspense>
          </section>

          <Route exact path={['/', '/polls']}>
            <Footer />
          </Route>

          <Modal />
        </>
      </Switch>
    </Suspense>
  )
})