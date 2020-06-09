import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewPollToolbar from './new_poll_toolbar';
import MultipleChoiceForm from './multiple_choice_form';
import { orderedGroups } from '../../../../util/selectors';
import { createPoll } from '../../../../actions/poll_actions';
import { closeModal } from '../../../../actions/ui_actions';

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
  query: '',
  groupsOpen: false,
  searching: false,
  error: ''
}

class NewPollForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, _nullNewPoll, { group: this.props.modalData.group });

    this.selectPollOption = this.selectPollOption.bind(this);
    this.createPoll = this.createPoll.bind(this);
    this.clickGroup = this.clickGroup.bind(this);
    this.submitGroup = this.submitGroup.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  };


  selectPollOption(option){
    this.setState({activeOption: option})
  }

  clickGroup(group){
    this.setState({ group: group, searching: false, groupsOpen: false })
  }

  submitGroup(title){
    let query = new RegExp(`^${title}`, 'i');
    let chosenGroup = this.props.groups.find( group => query.test(group.title) );
    this.setState({ group: chosenGroup, searching: false, groupsOpen: false })
  }

  clearErrors(){
    this.setState({error: ''})
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

  searchHandler(e){
    let query = e.target.value;
    let groupsOpen = this.props.groups.some(group => new RegExp(`^${query}`, 'i').test(group.title));
    this.setState({
      searching: true, 
      query, 
      groupsOpen
    });
  }

  handleLeave(e){
    let query = e.target.value;
    if (query) {
      this.submitGroup(e.target.value)
    } else {
      this.setState({query: '', group: undefined, searching: false})
    }
  }

  toggleDrawer(){
    this.setState({groupsOpen: !this.state.groupsOpen})
  }

  render() {
    const { groups } = this.props;
    const { searching, query, activeOption, group, groupsOpen, error } = this.state;

    let searchText, matchingGroups;
    if ( searching && query ) {
      searchText = query;
      matchingGroups = groups.filter(group => new RegExp(`^${query}`, 'i').test(group.title));
    } else if ( group && !searching ) {
      searchText = group.title;
    } else {
      searchText = '';
    }

    const Form = FORM_COMPONENTS[activeOption];
    const drawerGroups = matchingGroups || groups;
    const placeholderText = 'Assign activity to a group';

    return (
      <section className='new-poll-container'>
        
        <NewPollToolbar hideOnSticky={true} />
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
              <div tabIndex='0' onBlur={() => window.setTimeout( () => this.setState({ groupsOpen: false }), 10)}>
                <form onSubmit={e => {
                  e.preventDefault();
                  this.submitGroup(query);
                }}><input
                    type="text"
                    className='new-poll-group-search'
                    placeholder={placeholderText}
                    value={searchText}
                    tabIndex='1'
                    onChange={this.searchHandler}
                    onBlur={this.handleLeave}
                  />
                </form>

                <button onClick={this.toggleDrawer} className='button-grey'><i className="fas fa-chevron-down"></i></button>
                <ul className={'group-search-list' + (groupsOpen ? '' : ' hidden')}>
                  {drawerGroups.map(group => (
                    <li key={group.id} onClick={() => this.clickGroup(group)}>
                      {group.title}
                    </li>
                  ))}
                </ul>
              </div>
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
    closeModal: () => dispatch(closeModal(400))
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewPollForm));


