export const RECEIVE_MODAL = 'RECEIVE_MODAL'
export const CLEAR_MODAL = 'CLEAR_MODAL'
export const EXIT_MODAL = 'EXIT_MODAL'
export const CLEAR_MODAL_STATUS = 'CLEAR_MODAL_STATUS'
export const SET_SCROLL_Y = 'SET_SCROLL_Y'
export const SET_STICKY_TOOLBAR = 'SET_STICKY_TOOLBAR'

export const openModal = modal => {
  return {
    type: RECEIVE_MODAL,
    data: { scrollY: window.scrollY },
    modal
  }
}

export const clearStatus = () => {
  return {
    type: CLEAR_MODAL_STATUS
  }
}

export const exitModal = () => {
  return {
    type: EXIT_MODAL
  }
}
export const clearModal = () => {
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
    boolean
  }
}

