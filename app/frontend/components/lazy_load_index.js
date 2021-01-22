import { withLazy } from '../util/higher_order_components'

export const [ParticipantApp, fetchParticipantApp] = withLazy(
  () => import(
    /* webpackChunkName: "participate" */
    './participant/participant_app'
  )
);

export const [PresentPoll, fetchPresentPoll] = withLazy(
  () => import(
    /* webpackChunkName: "present" */
    './polls/poll/present_poll'
  )
);

export const [HomeSplash, fetchHomeSplash] = withLazy(
  () => import(
    /* webpackChunkName: "home" */
    './nav/home_splash'
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
    './polls/groups_index/groups_index'
  )
);

export const [SignupFormContainer, fetchSignupFormContainer] = withLazy(
  () => import(
    /* webpackChunkName: "signup-form" */
    './session/signup/signup_container'
  )
);