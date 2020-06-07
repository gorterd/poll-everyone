import React from 'react';
import { closeModal } from '../../actions/ui_actions';
import { connect } from 'react-redux';

class NewPollForm extends React.Component {
  constructor(props) {
    super(props)
    
  };

  render() {
    const { closeModal } = this.props;

    return (
      <section className='new-poll-container'>
        <div className='new-poll-top-bar'>
          <button onClick={ closeModal } className="button-blue">X</button>
        </div>
        <div className='new-poll-form-container'>
          <input type="text" name="" id=""/>
        </div>
        <br/>
        New Poll!!!
      </section>
    )
  }
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(null, mapDispatch)(NewPollForm);