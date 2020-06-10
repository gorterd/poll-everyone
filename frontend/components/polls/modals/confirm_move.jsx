import React from 'react';
import { connect } from 'react-redux';

const ConfirmMoveModal = ({ closeModal, modalData: { sendMoveRequest, numPolls } }) => {

  const word = numPolls === 1 ? 'poll' : 'polls';
  const subText = `You selected ${numPolls} ${word}. Click 'Apply' to move the selected ${word}.`;

  return (
    <>
      <h3>Confirm move</h3>
      <p>{subText}</p>

      <div className='buttons'>
        <button className='button-transparent' onClick={closeModal}>Cancel</button>
        <button className='button-blue' onClick={sendMoveRequest}>Apply</button>
      </div>
    </>
  )
}


const mapState = state => {
  return {
    modalData: state.ui.modal.data
  }
}


export default connect(mapState)(ConfirmMoveModal);

