import { withLazy, withLazyPrefetch } from '../util/higher_order_components'

export const [ParticipantApp, fetchParticipantApp] = withLazy(
  () => import(
    /* webpackChunkName: "participate" */
    './participate/participate_app'
  )
);

export const [PresentPoll, fetchPresentPoll] = withLazy(
  () => import(
    /* webpackChunkName: "present" */
    './polls/polls_show'
  )
);

export const [HomeSplash, fetchHomeSplash] = withLazy(
  () => import(
    /* webpackChunkName: "home" */
    './static/home_splash'
  )
);

export const [SignupSplash, fetchSignupSplash] = withLazy(
  () => import(
    /* webpackChunkName: "signup-splash" */
    './session/signup/signup_splash'
  )
);

export const [GroupsIndex, fetchGroupsIndex] = withLazy(
  () => import(
    /* webpackChunkName: "polls" */
    './polls/polls_index'
  )
);

export const [SignupFormContainer, fetchSignupFormContainer] = withLazy(
  () => import(
    /* webpackChunkName: "signup-form" */
    './session/signup/signup_container'
  )
);

export const [Navbar, fetchNavbar] = withLazy(
  () => import(
    /* webpackChunkName: "navbar" */
    './navbar/navbar'
  )
);

export const [Footer, fetchFooter] = withLazy(
  () => import(
    /* webpackChunkName: "footer" */
    './static/footer'
  )
);

export const [EditPoll, fetchEditPoll] = withLazy(
  () => import(
    /* webpackChunkName: "edit-poll" */
    './polls/polls_edit'
  )
);

export const [LoginForm, fetchLoginForm] = withLazy(
  () => import(
    /* webpackChunkName: "login" */
    './session/login'
  )
);
