import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewPollToolbar from './new_poll_toolbar';
import MultipleChoiceForm from './multiple_choice_form';
import { orderedGroups } from '../../../../util/selectors';
import { createPoll } from '../../../../actions/poll_actions';
import { closeModal, exitModal } from '../../../../actions/ui_actions';
import GroupSearch from '../../../shared/group_search';

const MULTIPLE_CHOICE = 'multiple_choice';

const FORM_COMPONENTS = {
  [MULTIPLE_CHOICE]: MultipleChoiceForm,
}

const errorKeys = {
  TITLE_BLANK: 'TITLE_BLANK',
  ANSWER_OPTIONS_BLANK: 'ANSWER_OPTIONS_BLANK',
}

const errorMessages = {
  TITLE_BLANK: 'Please enter a title',
  ANSWER_OPTIONS_BLANK: 'Please enter at least one response',
}

const _nullNewPoll = {
  activeOption: MULTIPLE_CHOICE,
  group: undefined,
  error: ''
}

class NewPollForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, _nullNewPoll, { group: this.props.modalData.group });

    this.selectPollOption = this.selectPollOption.bind(this);
    this.createPoll = this.createPoll.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.setGroup = this.setGroup.bind(this);
  };

  setGroup(group) {
    this.setState({ group });
  }

  selectPollOption(option){
    this.setState({activeOption: option})
  }

  clearErrors(){
    this.setState({error: ''});
  }

  createPoll(formData){
    if ( !formData.title ) {
      this.setState({ error: errorKeys.TITLE_BLANK })
    } else if (formData.answerOptionsAttributes.length === 0 ) {
      this.setState({ error: errorKeys.ANSWER_OPTIONS_BLANK })
    } else {
      const answerOptionsAttributes = formData.answerOptionsAttributes
        .map( (option, idx) => (Object.assign(option, { ord: idx })));
      const data = Object.assign(formData, { pollType: this.state.activeOption, answerOptionsAttributes });
      const groupId = this.state.group ? this.state.group.id : this.props.groups.find( g => g.ord === 0).id;
      this.props.createPoll(data, groupId).then( () => this.props.closeModal());
    }
  }

  render() {
    const { groups } = this.props;
    const { activeOption, group, error } = this.state;

    const Form = FORM_COMPONENTS[activeOption];

    return (
      <section className='new-poll-container'>
        
        <NewPollToolbar hideOnSticky={false} />
        <div className='new-poll-main'>
          <div className='new-poll-form-container'>

            <ul className='new-poll-options'>
              <li
                className={'new-poll-option' + (activeOption === MULTIPLE_CHOICE ? ' active-option' : '')}
                onClick={() => this.selectPollOption(MULTIPLE_CHOICE)}
              >
                <img src={window.multipleChoiceOptionURL} alt='multiple-choice' />
                <span>Multiple choice</span>
              </li>
            </ul>

            <Form
              createPoll={this.createPoll}
              clearErrors={this.clearErrors}
              error={error}
              errorKeys={errorKeys}
              errorMessages={errorMessages}
            />

            <div className='new-poll-bottom-bar'>
              <GroupSearch
                defaultGroup={this.props.modalData.group?.title}
                setGroup={this.setGroup}
                groups={groups}
                placeholderText='Assign activity to a group'
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
};

const mapState = state => {
  return {
    groups: orderedGroups(state),
    modalType: state.ui.modal.type
  }
}

const mapDispatch = dispatch => {
  return {
    createPoll: (poll, groupId) => dispatch(createPoll(poll, groupId)),
    closeModal: () => dispatch(exitModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewPollForm));


