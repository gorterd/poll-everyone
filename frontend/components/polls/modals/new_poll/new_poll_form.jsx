import React from 'react';
import {connect} from 'react-redux';
import NewPollToolbar from './new_poll_toolbar';
import { closeModal } from '../../../../actions/ui_actions'

class NewPollForm extends React.Component {
  constructor(props) {
    super(props)
    
  };

  render() {
    const { stickyToolbar, closeModal } = this.props;

    return (
      <section className='new-poll-container'>
        
        <NewPollToolbar hideOnSticky={true} />
        {/* <div className={'new-poll-toolbar' + ( stickyToolbar ? ' invisible' : '')}> */}
        {/* <div className={'new-poll-toolbar'}>
          <button onClick={closeModal} className="button-blue">X</button>
        </div> */}
        <div className='new-poll-form-container'>
          <input type="text" name="" id=""/>
        </div>
        <br/>
        New Poll!!!
      </section>
    )
  }
};

const mapState = ({ ui: { stickyToolbar } }) => ({ stickyToolbar });

export default connect(mapState)(NewPollForm);


