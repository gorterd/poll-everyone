import React from 'react';
import { connect} from 'react-redux';
import { 
  fetchPresentation, 
  receiveActivePoll, 
  clearActivePoll,
  receiveResponse,
  clearResponse
} from '../../actions/presentation_actions';

import { withRouter } from 'react-router-dom';
import { participantPollData } from '../../util/selectors';
import AttributedImage from '../shared/attributed_image';

const POLL = 'POLL';
const RESPONSE = 'RESPONSE';
const CLEAR_RESPONSE = 'CLEAR_RESPONSE';

class ParticipantPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = { subscription: null }
    this.receiveBroadcast = this.receiveBroadcast.bind(this);
    this.clickAnswerOption = this.clickAnswerOption.bind(this);
    this.clearLastResponse = this.clearLastResponse.bind(this);
  };

  componentDidMount() {
    const { currentType, currentId } = this.props.session;
    const username = this.props.match.params.username;
    this.props.clearActivePoll();

    this.props.fetchPresentation( currentType, currentId, username )
      .then( presParticipant => {
        this._subscribe(presParticipant.presenterId, presParticipant.id) 
      });   
  }


  _subscribe(presenterId, participantId) {
    const { ownResponses } = this.props;

    const subscription = App.cable.subscriptions.create(
      { channel: 'PresentationChannel', presenterId },
      {
        received: broadcast => {
          this.receiveBroadcast(broadcast)
        },

        respond: function(answerOptionId) {
          const response = { answerOptionId, participantId }
          return this.perform("respond", response);
        },

        clear: function(id) {
          return this.perform("clear", { id })
        },

        text: function(str) {
          return this.perform("text", str)
        }
      }
    );

    this.setState({subscription})
  }

  receiveBroadcast(broadcast){
    const response = JSON.parse(broadcast.data);
    switch (broadcast.type){
      case POLL:
        if (response.poll.active){
          this.props.receiveActivePoll(response);
        } else {
          this.props.clearActivePoll();
        }
        break;
      case RESPONSE:
        this.props.receiveResponse(response);
        break;
      case CLEAR_RESPONSE:
        this.props.clearResponse(response);
        break;
    }
  }

  clickAnswerOption(optionId){
    this.state.subscription.respond(optionId);
  }

  clearLastResponse(){
    const {ownResponses} = this.props;
    let lastIdx = ownResponses.length - 1;
    if (lastIdx >= 0){
      this.state.subscription.clear(ownResponses[lastIdx].id);
    }
  }

  _getSubText(responsesRemaining, numResponsesAllowed){
    switch (responsesRemaining) {
      case 0:
        return 'You have responded the max number of times';
      case numResponsesAllowed:
        return `You can respond ${responsesRemaining} times`;
      default:
        return `You have ${responsesRemaining} response${responsesRemaining > 1 ? 's' : ''} remaining`;
    }
  }

  render() {
    const { activePoll, ownResponses, activeAnswerOptions, participant } = this.props;
    const { subscription } = this.state;
    const username = this.props.match.params.username;

    let renderedContent;
    if (activePoll && this.state.subscription ){
      
      const { title, numResponsesAllowed } = activePoll;
      const responsesRemaining = numResponsesAllowed - ownResponses.length;
      const disabledAnswer = responsesRemaining < 1;
      const disabledClear = responsesRemaining === numResponsesAllowed;
      const subText = this._getSubText(responsesRemaining, numResponsesAllowed);

      const options = activeAnswerOptions.map( option => (
        <li key={option.id}>
          <button 
            onClick={() => {
              if(!disabledAnswer){
                this.clickAnswerOption(option.id);
              }
            }}
            className='answer-option-button'
            disabled={disabledAnswer}
          >
            <span className='num-responses'>{option.numOwnResponses}</span>
            <span className='answer-body'>{option.body}</span>
          </button>
        </li>
      ));
      
      renderedContent = (
        <div className='participant-poll'>
          <h3>{title}</h3>
          <span>{subText}</span>
          <ul>
            {options}
          </ul>
          <button 
            className='button-blue' 
            disabled={disabledClear}
            onClick={this.clearLastResponse}
          >Clear last response</button>
        </div>
      )
    } else if (this.state.subscription) {
      renderedContent = (
        <div className='participant-waiting'>
          <AttributedImage
            id="participant-waiting-img"
            src={window.participantWaitingURL}
            alt={"preparing presentation"}
            iconClass="icon-light"
          >
            <a href="https://stories.freepik.com/illustration/work-time/amico#FF725EFF">Illustration vector created by stories - stories.freepik.com</a>
          </AttributedImage>
          <div>
            <span>Waiting for {username}'s presentation to begin...</span>
            <p>
              {username}'s presentation isn't activated right now. As soon as it is activated,
              it'll appear right here. Hang tight!
            </p>
          </div>
        </div>
      )
    } else {
      renderedContent = null;
    }

    return (
      <div className='participant-poll-container'>
        <div className='screenname-bar'>
          Responding { participant.screenName ? <>as <span>{'hello'}</span></> : 'anonymously' }
        </div>
        {renderedContent}
      </div>
    )
  }
};

const mapState = state => {
  const { activePoll, ownResponses, activeAnswerOptions } = participantPollData(state);
  return {
    session: state.session,
    participant: state.presentation.participant,
    activePoll, ownResponses, activeAnswerOptions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPresentation: (type, id, username) => dispatch(fetchPresentation(type, id, username)),
    receiveActivePoll: data => dispatch(receiveActivePoll(data)),
    clearActivePoll: () => dispatch(clearActivePoll()),
    receiveResponse: response => dispatch(receiveResponse(response)),
    clearResponse: response => dispatch(clearResponse(response)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(ParticipantPoll));