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

const POLL = 'POLL';
const RESPONSE = 'RESPONSE';
const CLEAR_RESPONSE = 'CLEAR_RESPONSE';
const CLEAR_POLL = 'CLEAR_POLL';

class ParticipantPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = { words: []}
    this.receiveBroadcast = this.receiveBroadcast.bind(this);
  };

  componentDidMount() {
    const { currentType, currentId } = this.props.session;
    const username = this.props.match.params.username;

    this.props.fetchPresentation( currentType, currentId, username )
      .then( presParticipant => {
        
        this._subscribe(presParticipant.presenterId, presParticipant.id) 
      });   
  }


  _subscribe(presenterId, participantId) {
    const { ownResponses } = this.props;

    this.subscription = App.cable.subscriptions.create(
      { channel: 'PresentationChannel', presenterId },
      {
        received: broadcast => {
          this.receiveBroadcast(broadcast)
        },

        respond: function(answerOptionId) {
          const response = { answerOptionId, participantId }
          return this.perform("respond", response);
        },

        clear: function() {
          return this.perform("clear", ownResponses[ownResponses.length -1])
        },

        text: function(str) {
          return this.perform("text", str)
        }
      }
    );
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
      case CLEAR_POLL:
        this.props.clearActivePoll();
        break;
      case 'WORD':
        this.setState({ words: this.state.words.concat(broadcast.text)})
        break;
    }
  }

  render() {
    const { session, activePoll, ownResponses, activeAnswerOptions } = this.props;

    window.subscription = this.subscription;
    return (
      <div className='participant-presentation'>
        
        Active Poll Title: {activePoll ? activePoll.title : null}

        Answer Options:
        {activeAnswerOptions ? activeAnswerOptions.map( (option, idx) => {
          return (<li key={idx}>
            Text: {option.body? option.body : null}
          </li>)
        }) : null }
      </div>
    )
  }
};

const mapState = state => {
  const { activePoll, ownResponses, activeAnswerOptions } = participantPollData(state);
  return {
    session: state.session,
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