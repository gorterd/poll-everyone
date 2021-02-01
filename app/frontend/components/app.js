import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AuthRoute, ProtectedRoute } from './wrappers/routes'
import { Modal } from './shared/modal'
import DOMUtilities from './dom_utilities'
import { useStateValue } from '../util/custom_hooks'
import { componentDoneLoading, componentLoading } from '../store/actions/ui_actions'

import { 
  Navbar,
  Footer,
  EditPoll,
  Login,
  ParticipantApp,
  HomeSplash,
  SignupSplash,
  // SignupFormContainer,
  Signup,
  GroupsIndex,
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

export default function App() {
  const scrollY = useStateValue('ui scrollY')
  const modalType = useStateValue('modal type')
  
  return (
    <section
      className={'app' + (modalType ? ' freeze-scroll' : '')}
      style={modalType ? { top: (scrollY * -1) } : null}
    >
      <DOMUtilities />
      <React.Suspense fallback={<Fallback componentName='app'/>}>
        <Switch>
          <Route path='/participate'>
            <ParticipantApp/>
          </Route>
          <>
            <section className='content'>
              <Navbar />

              <React.Suspense fallback={<Fallback componentName='content'/>}>
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
                  <GroupsIndex />
                </ProtectedRoute>

                <ProtectedRoute path='/polls/:pollId/edit'>
                  <EditPoll />
                </ProtectedRoute>

                <ProtectedRoute path='/polls/:pollId/show'>
                  <PresentPoll />
                </ProtectedRoute>
              </React.Suspense>
            </section>

            <Route exact path={['/', '/polls', '/account']}>
              <Footer />
            </Route>

            <Modal />
          </>
        </Switch>
      </React.Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </section>
  )
}