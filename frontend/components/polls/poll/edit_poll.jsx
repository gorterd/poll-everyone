import React from 'react';
import LargeInput from '../../../components/shared/large-animated-input';
import { pollData } from '../../../util/selectors';
import { updatePoll, fetchPoll } from '../../../actions/poll_actions'
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

const errorKeys = {
  TITLE_BLANK: 'TITLE_BLANK',
  ANSWER_OPTIONS_BLANK: 'ANSWER_OPTIONS_BLANK',
}

const errorMessages = {
  TITLE_BLANK: 'Please enter a title',
  ANSWER_OPTIONS_BLANK: 'Please enter at least one response',
}

class EditPoll extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      formData: {
        title: '',
        answerOptionsAttributes: [
          { correct: false, body: '' },
          { correct: false, body: '' },
        ]
      },
      error:  ''
    }

    this.deleted = [];

    this.handleTitle = this.handleTitle.bind(this);
    this.handleAnswerBody = this.handleAnswerBody.bind(this);
    this.toggleCorrect = this.toggleCorrect.bind(this);
    this.deleteAnswerOption = this.deleteAnswerOption.bind(this);
    this.addOption = this.addOption.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchPoll(this.props.pollId).then( () => {
      const { data: { poll, orderedAnswerOptions } } = this.props;
      
      const formData = {
        title: poll.title,
        answerOptionsAttributes: orderedAnswerOptions.map( option => (
          { 
            correct: option.correct, 
            body: option.body, 
            id: option.id 
          })
        )
      }

      this.setState({formData});
    });
  }

  handleTitle(e) {
    if (this.titleError ) { this.clearErrors() }
    const formData = Object.assign({}, this.state.formData, { title: e.target.value } );
    this.setState({formData});
  }

  handleAnswerBody(e, idx) {
    if ( this.answerError ) { this.clearErrors() }

    const answerOptionsAttributes = Array.from(this.state.formData.answerOptionsAttributes);
    answerOptionsAttributes[idx] =
      Object.assign({}, answerOptionsAttributes[idx], { body: e.target.value });
    
    this._setAnswerOptionAttributes(answerOptionsAttributes);
  }

  toggleCorrect(idx) {
    const answerOptionsAttributes = Array.from(this.state.formData.answerOptionsAttributes);

    answerOptionsAttributes[idx] =
      Object.assign({}, answerOptionsAttributes[idx],
        { correct: !answerOptionsAttributes[idx].correct });

    this._setAnswerOptionAttributes(answerOptionsAttributes);
  }

  deleteAnswerOption(idx) {
    const deletedOption = this.state.formData.answerOptionsAttributes[idx];
    if ( deletedOption.id ) { this.deleted.push(deletedOption.id)} 
  
    const answerOptionsAttributes = Array.from(this.state.formData.answerOptionsAttributes);
    answerOptionsAttributes.splice(idx, 1);
    
    this._setAnswerOptionAttributes(answerOptionsAttributes);
  }

  addOption(e) {
    e.preventDefault();

    const answerOptionsAttributes =
      Array.from(this.state.formData.answerOptionsAttributes).concat({ correct: false, body: '' });

    if (answerOptionsAttributes.length === 1) { this.clearErrors() }

    this._setAnswerOptionAttributes(answerOptionsAttributes);
  }

  clearErrors() {
    this.setState({ error: '' })
  }

  handleSubmit(e) {
    e.preventDefault();
    if ( !this.validateSubmit() ) { return null }
 
    this._withoutBody().forEach( emptyOption => {
      if (emptyOption.id) {
        this.deleted.push(emptyOption.id);
      }
    });
    
    const answerOptionsAttributes = Array.from( this._withBody() )
      .map( (option, idx) => (Object.assign(option, { ord: idx }) ) )
      .concat(this._getDeletedAttributes());

    const formData = Object.assign({}, this.state.formData, { answerOptionsAttributes });

    this.props.updatePoll(formData, this.props.pollId).then( () => this.props.history.push('/polls'));
  }

  validateSubmit() {
    
    if (!this.state.formData.title) {
      this.setState({ error: errorKeys.TITLE_BLANK })
      return false;
    } else if (this._withBody().length === 0) {
      this.setState({ error: errorKeys.ANSWER_OPTIONS_BLANK })
      return false;
    } else {
      return true;
    }
  }

  _withBody() {
    return this.state.formData.answerOptionsAttributes
      .filter(option => option.body);
  }

  _withoutBody() {
    return this.state.formData.answerOptionsAttributes
      .filter(option => !option.body);
  }

  _getDeletedAttributes(){
    return this.deleted.map( id => ({ id, '_destroy': 1 }))
  }

  _setAnswerOptionAttributes(answerOptionsAttributes) {
    const formData = Object.assign({}, this.state.formData, { answerOptionsAttributes });
    this.setState({formData});
  }

  render() {

    const { error, formData: { title, answerOptionsAttributes } } = this.state;

    this.titleError = (error === errorKeys.TITLE_BLANK) ? errorMessages[error] : '';
    this.answerError = (error === errorKeys.ANSWER_OPTIONS_BLANK) ? errorMessages[error] : '';

    const CorrectButton = ({ selected, idx }) => (
      <span
        className={'correct-button button' + (selected ? ' selected' : '')}
        onClick={() => this.toggleCorrect(idx)}
      >
        <i className="fas fa-check"></i>
      </span>
    )

    const RightSide = ({ idx }) => (
      <div className='edit-poll-input-right-side'>
        <span className='trash-button button' onClick={() => this.deleteAnswerOption(idx)} >
          <i className="far fa-trash-alt"></i>
        </span>
        <span>{String.fromCharCode(idx + 65)}</span>
      </div>
    )

    return (
      <form onSubmit={this.handleSubmit} className='edit-poll-form multiple-choice-form'>
        <div className='edit-poll-form-left'>
          <LargeInput
            klass='title-input-container'
            type='text'
            errorMsg={this.titleError}
            text='Title'
            value={title}
            onChange={this.handleTitle}
          />

          {answerOptionsAttributes.map((option, idx) => (
            <LargeInput
              key={idx}
              klass='answer-option-input-container'
              type='text'
              errorMsg={idx ? '' : this.answerError}
              text='Text'
              value={option.body}
              onChange={e => this.handleAnswerBody(e, idx)}
              leftSide={CorrectButton}
              leftSideProps={{ selected: option.correct, idx }}
              rightSide={RightSide}
              rightSideProps={{ idx }}
            />
          ))}

          <div>
            <button className='button-blue-alt' onClick={this.addOption}>
              <i className="fas fa-plus"></i><span>Add option</span>
            </button>
            {answerOptionsAttributes.length === 0 ? <span>{errorMessages[error]}</span> : null}
          </div>
        </div>
        

        <div className='edit-poll-form-right'>
          <div className='edit-poll-executive-commands'>
            <button className='button-blue' type='submit' onClick={this.handleSubmit}>Save</button>
            <button className='button-transparent' 
              onClick={ (e) => {
                e.preventDefault();
                this.props.history.goBack();
              }}
            >Cancel</button>
          </div>
        </div>

      </form>
    )
  }
};

const mapState = (state, ownProps) => {
  const pollId = ownProps.match.params.pollId

  return {
    data: pollData(state, pollId),
    pollId
  }
}

const mapDispatch = dispatch => {
  return {
    updatePoll: (data, pollId) => dispatch(updatePoll(data, pollId)),
    fetchPoll: (pollId) => dispatch(fetchPoll(pollId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditPoll));
