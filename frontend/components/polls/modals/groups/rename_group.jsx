import React from 'react';
import { connect } from 'react-redux';
import { updateGroup } from '../../../../actions/group_actions';

class EditGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.group = this.props.modalData.group;

    this.state = {
      title: this.group.title,
    }


    this.updateGroup = this.updateGroup.bind(this);
  };

  updateGroup() {
    this.props.updateGroup(Object.assign({}, this.group, this.state)).then(() => {
      this.props.closeModal();
    });
  }

  render() {
    const { closeModal } = this.props;

    return (
      <>
        <h3>Edit group</h3>
        <p>Update group name</p>
        <input type="text" value={this.state.title} autoFocus
          onChange={e => this.setState({ title: e.target.value })} />

        <div className='buttons'>
          <button className='button-transparent' onClick={closeModal}>Cancel</button>
          <button className='button-blue' disabled={ !Boolean(this.state.title) }
          onClick={this.updateGroup}>Update name</button>
        </div>
      </>
    )
  }
};

const mapState = state => {
  return {
    modalData: state.ui.modal.data
  }
}

const mapDispatch = dispatch => {
  return {
    updateGroup: (group) => dispatch(updateGroup(group)),
  }
}


export default connect(mapState, mapDispatch)(EditGroupModal);

