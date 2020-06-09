import React from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../../../actions/group_actions';

class NewGroupModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }

    this.pollIds = this.props.modalData.pollIds;

    this.createGroup = this.createGroup.bind(this);
  };

  createGroup(){
    const data = Object.assign({ group: this.state}, { pollIds: this.props.modalData.pollIds });
    this.props.createGroup(data, this.props.currentUserId).then( () => this.props.closeModal());
  }

  render() {
    const { modalData, closeModal } = this.props;

    const pollIds = modalData.pollIds || this.pollIds;
    const numPolls = pollIds.length;

    let headerText, subText;
    switch (numPolls > 0) {
      case true:
        headerText = 'Create new group';
        subText = `${numPolls} selected poll${numPolls > 1 ? 's' : ''} will be moved into this group.`;
        break;
      case false:
        headerText = 'Create empty group';
        subText = 'No activities selected.';
    }

    return (
      <>
        <h3>{headerText}</h3>
        <p>{subText}</p>
        <input type="text" placeholder='Group name' value={this.state.title} 
          onChange={ e => this.setState({ title: e.target.value})}/>

        <div className='buttons'>
          <button className='button-grey-alt' onClick={closeModal}>Cancel</button>
          <button className='button-blue' onClick={this.createGroup}>Create group</button>
        </div>
      </>
    )
  }
};

const mapState = state => {
  return {
    currentUserId: state.session.currentId,
    modalData: state.ui.modal.data
  }
}

const mapDispatch = dispatch => {
  return {
    createGroup: (data, currentUserId) => dispatch(createGroup(data, currentUserId))
  }
}


export default connect(mapState, mapDispatch)(NewGroupModal);

