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
        received: broadcast => this.receiveBroadcast(broadcast),

        respond: function (answerOptionId) {
          const response = { answerOptionId, participantId }
          return this.perform("respond", response);
        },

        clear: function () {
          return this.perform("clear", ownResponses[ownResponses.length -1])
        },

        text: function(str) {
          return this.perform("text", str)
        }
      }
    );
  }

  receiveBroadcast(broadcast){
    
    switch (broadcast.type){
      case POLL:
        this.receiveActivePoll(broadcast.data);
        break;
      case RESPONSE:
        this.receiveResponse(broadcast.data);
        break;
      case CLEAR_RESPONSE:
        this.clearResponse(broadcast.data);
        break;
      case CLEAR_POLL:
        this.clearActivePoll();
        break;
      case 'WORD':
        this.setState({ words: this.state.words.concat(broadcast.text)})
        break;
    }
  }

  render() {
    const { session, activePoll, ownResponses, activeAnswerOptions } = this.props;

    return (
      <div>

        <input type="text" onBlur={ () => {
          let word;
          if (this.subscription) {
            word = e.target.value;
            this.subscription.text(word);
          } else {
            this.setState({words: this.state.words.concat('BOO')})
          }}
          }/>

          <ul>
            {this.state.words.map( word => <li>{word}</li>)}
          </ul>
        
        {/* Active Poll Title: {activePoll ? activePoll.title : null}

        Answer Options:
        {activeAnswerOptions.map( option, idx => {
          return (<li key={idx}>
            Text: {option.body? option.body : null}
          </li>)
        })} */}
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