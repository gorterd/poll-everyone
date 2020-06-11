import { 
  RECEIVE_ACTIVE_POLL, 
  CLEAR_ACTIVE_POLL,
  RECEIVE_PARTICIPANT,
  CLEAR_PRESENTATION,
} from '../actions/presentation_actions';

const _nullPresentation = {
  activePollId: null,
  participant: {}
}

export default (state = _nullPresentation, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ACTIVE_POLL:
      return {
        activePollId: action.data.poll ? action.data.poll.id : null,
        participant: action.data.participant  
      };
    case RECEIVE_PARTICIPANT:
      if (action.data){
        return Object.assign({}, state, { participant: action.data.participant } );
      } else { return state; }
    case CLEAR_ACTIVE_POLL:
      return Object.assign({}, state, {activePollId: null})
    case CLEAR_PRESENTATION:
      return _nullPresentation;
    default:
      return state;
  }
}