import React from 'react';
import LargeInput from '../../../shared/large-animated-input';

class MultipleChoiceForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      answerOptionsAttributes: [
        { correct: false, body: ''},
        { correct: false, body: ''},
      ]
    }

    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnswerBody = this.handleAnswerBody.bind(this);
    this.toggleCorrect = this.toggleCorrect.bind(this);
    this.deleteAnswerOption = this.deleteAnswerOption.bind(this);
    this.addOption = this.addOption.bind(this);
  }

  handleTitle(e){
    if (this.titleError) { this.props.clearErrors() }
    this.setState({ title: e.target.value});
  }

  handleAnswerBody(e, idx) {
    const answerOptionsAttributes = Array.from(this.state.answerOptionsAttributes);
    answerOptionsAttributes[idx] = 
      Object.assign( {}, answerOptionsAttributes[idx], {body: e.target.value });
    if ( this.answerError ) { this.props.clearErrors() }
    this.setState({ answerOptionsAttributes });
  }

  toggleCorrect(idx) {
    const answerOptionsAttributes = Array.from(this.state.answerOptionsAttributes);
    answerOptionsAttributes[idx] =
      Object.assign({}, answerOptionsAttributes[idx], 
        { correct: !answerOptionsAttributes[idx].correct });
    this.setState({ answerOptionsAttributes });
  }

  deleteAnswerOption(idx){
    const answerOptionsAttributes = Array.from(this.state.answerOptionsAttributes);
    answerOptionsAttributes.splice(idx,1);
    this.setState({ answerOptionsAttributes });
  }

  addOption(e){
    e.preventDefault();
    const answerOptionsAttributes = 
      Array.from(this.state.answerOptionsAttributes).concat({ correct: false, body: ''});
    if (answerOptionsAttributes.length === 1) { this.props.clearErrors() }
    this.setState({ answerOptionsAttributes });
  }

  handleSubmit(e) {
    e.preventDefault();
    const answerOptionsAttributes = this.state.answerOptionsAttributes
      .filter( option => option.body ); 
    this.props.createPoll(Object.assign({}, this.state, { answerOptionsAttributes}));
  }

  render(){
    const { error, errorKeys, errorMessages } = this.props;
    const { title, answerOptionsAttributes } = this.state;

    const errorMsg = errorMessages[errorKeys[error]];
    this.titleError = (error === errorKeys.TITLE_BLANK) ? errorMsg : '';
    this.answerError = (error === errorKeys.ANSWER_OPTIONS_BLANK) ? errorMsg : '';

    const CorrectButton = ({selected, idx}) => (
      <span 
        className={'correct-button button' + (selected ? ' selected' : '')}
        onClick={ () => this.toggleCorrect(idx)}
        >
        <i className="fas fa-check"></i>
      </span>
    )

    const TrashButton = ({ idx }) => (
      <span className='trash-button button' onClick={() => this.deleteAnswerOption(idx)} >
        <i className="far fa-trash-alt"></i>
      </span>
    )

    return (
      <form onSubmit={this.handleSubmit} className='new-poll-form multiple-choice-form'>
        <span>Ask a question and let participants choose from a list of answers.</span>

        <LargeInput
          klass='title-input-container'
          type='text'
          errorMsg={this.titleError}
          text='Title' 
          value={title}
          onChange={this.handleTitle}
        />

        {answerOptionsAttributes.map( (option, idx) => (
          <LargeInput
            key={idx}
            klass='answer-option-input-container'
            type='text'
            errorMsg={ idx ? '' : this.answerError }
            text='Text'
            value={option.body}
            onChange={ e => this.handleAnswerBody(e, idx)}
            leftSide={CorrectButton}
            leftSideProps={ { selected: option.correct, idx }}
            rightSide={TrashButton}
            rightSideProps={ { idx }}
          />
        ))}

        <div className='new-poll-form-buttons'>
          <div>
            <button className='button-blue-alt' onClick={this.addOption}>
              <i className="fas fa-plus"></i><span>Add option</span>
            </button>
            {answerOptionsAttributes.length === 0 ? <span>{errorMsg}</span> : null }
          </div>

          <button className='button-blue' type='submit' onClick={this.handleSubmit} tabIndex='2'>Create</button>
        </div>
      </form>
    )
  }
}





export default MultipleChoiceForm;