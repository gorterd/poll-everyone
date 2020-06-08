import React from 'react';

const NewGroupModal = ({modalData, closeModal}) => {
  return (
    <div>
      NEW GROUP!!!!
      Polls to include in your new group:
      <ul>
        { modalData && modalData.pollIds ? modalData.pollIds.map( id => <li>{id}</li>) : null}
      </ul> 
    </div>
  )
}

export default NewGroupModal;