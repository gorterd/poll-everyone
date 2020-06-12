import React from 'react';
import { presenterPollData } from '../../../util/selectors';
import { updatePoll, fetchFullPoll, toggleActive } from '../../../actions/poll_actions'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { 
  receiveActivePoll, 
  clearActivePoll, 
  receiveResponse, 
  clearResponse } 
from '../../../actions/presentation_actions';
import { batchDestroy } from '../../../actions/group_actions';

const POLL = 'POLL';
const RESPONSE = 'RESPONSE';
const CLEAR_RESPONSE = 'CLEAR_RESPONSE';

class PresentPoll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subscription: null
    }

    this._subscribe = this._subscribe.bind(this)
    this.receiveBroadcast = this.receiveBroadcast.bind(this)
    this.toggleActivation = this.toggleActivation.bind(this)
  }

  componentDidMount() {
    const { pollId, currentId } = this.props;

    this.props.fetchFullPoll(pollId)
      .then( poll => {
        if (poll.active) {
          this._subscribe(currentId)
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  _subscribe(presenterId) {
    this.setState({
      subscription: App.cable.subscriptions.create(
        { channel: 'PresentationChannel', presenterId },
        {
          received: broadcast => {
            this.receiveBroadcast(broadcast)
          },
        }
      )
    }) 
  }

  receiveBroadcast(broadcast) {
    const { receiveActivePoll, clearActivePoll, receiveResponse, clearResponse } = this.props;
    const response = JSON.parse(broadcast.data);
    
    switch (broadcast.type) {
      case POLL:
        response.poll.active ? receiveActivePoll(response) : clearActivePoll();
        break;
      case RESPONSE:
        receiveResponse(response);
        break;
      case CLEAR_RESPONSE:
        clearResponse(response);
        break;
    }
  }

  toggleActivation(){
    const { subscription } = this.state;
    const { poll: { active: isDeactivating, id: pollId }, currentId, toggleActive } = this.props;

    toggleActive(pollId).then( () => {
      isDeactivating ? subscription.unsubscribe() : this._subscribe(currentId);
    });
  }

  render() {

    const { subscription } = this.state;
    const { pollId, poll, history, fullAnswerOptions } = this.props;

    // if (poll) { debugger;}
    const renderedContent = (poll) ? (
        <div className='unformatted-data'>
          <h3>{poll.title}</h3>
          <ul>
            { fullAnswerOptions ? fullAnswerOptions.map(option => (
              <li key={option.id}>
                <span className='num-responses'>{option.responses.length}</span>
                <span className='answer-body'>{option.body}</span>
              </li>
            )) : null }
          </ul>
        </div>
      ) : null;

    return (
      <section className='show-poll-container'>
        <div className='show-poll-left'>
          <div className='graph-container'>
            <div className='graph'>
              {renderedContent}
            </div>
          </div>
        </div>


        <div className='show-poll-right'>
          <div className='show-poll-executive-commands'>
            <Link className='button-blue' to={`/polls/${pollId}/edit`}>Edit</Link>
            <button className='button-transparent'
              onClick={this.toggleActivation}
            >{ (poll && poll.active) ? 'Deactivate' : 'Activate'}</button>
            <button className='button-transparent'
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >Back</button>
          </div>
        </div>

      </section>
    )
  }
};

const mapState = (state, ownProps) => {
  const pollId = ownProps.match.params.pollId;
  const { poll, fullAnswerOptions } = presenterPollData(state, pollId);
  
  return {
    currentId: state.session.currentId,
    pollId, poll, fullAnswerOptions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchFullPoll: (pollId) => dispatch(fetchFullPoll(pollId)),
    receiveActivePoll: data => dispatch(receiveActivePoll(data)),
    clearActivePoll: () => dispatch(clearActivePoll()),
    receiveResponse: response => dispatch(receiveResponse(response)),
    clearResponse: response => dispatch(clearResponse(response)),
    toggleActive: pollId => dispatch(toggleActive(pollId)),

  }
}

export default withRouter(connect(mapState, mapDispatch)(PresentPoll));
