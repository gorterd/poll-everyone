export const RECEIVE_MODAL = 'RECEIVE_MODAL'
export const CLEAR_MODAL = 'CLEAR_MODAL'

export const openModal = modal => {
  return {
    type: RECEIVE_MODAL,
    modal
  }
}

export const closeModal = () => {
  return {
    type: CLEAR_MODAL
  }
}