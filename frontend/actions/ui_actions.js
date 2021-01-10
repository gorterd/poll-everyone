export const RECEIVE_MODAL = 'RECEIVE_MODAL'
export const CLEAR_MODAL = 'CLEAR_MODAL'
export const EXIT_MODAL = 'EXIT_MODAL'
export const SET_SCROLL_Y = 'SET_SCROLL_Y'
export const SET_STICKY_TOOLBAR = 'SET_STICKY_TOOLBAR'
export const CLEAR_STICKY_TOOLBAR = 'CLEAR_STICKY_TOOLBAR'

export const openModal = modal => {
  return {
    type: RECEIVE_MODAL,
    data: { scrollY: window.scrollY },
    modal
  }
}

const exitModal = () => {
  return {
    type: EXIT_MODAL
  }
}

const clearModal = () => {
  return {
    type: CLEAR_MODAL
  }
}

export const setScrollY = scrollY => {
  return {
    type: SET_SCROLL_Y,
    scrollY
  }
}

export const setStickyToolbar = boolean => {
  return {
    type: SET_STICKY_TOOLBAR,
    // height
    boolean
  }
}

// export const clearStickyToolbar = () => {
//   return {
//     type: CLEAR_STICKY_TOOLBAR,
//   }
// }

export const closeModal = delay => dispatch => {
  dispatch(exitModal());
  window.setTimeout( () => {
    dispatch(clearModal());
  }, parseInt(delay));
} 


