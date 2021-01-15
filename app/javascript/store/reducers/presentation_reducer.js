import { 
  RECEIVE_ACTIVE_POLL, 
  CLEAR_ACTIVE_POLL,
  RECEIVE_PARTICIPANT,
  CLEAR_PRESENTATION,
  RECEIVE_RECENT_PRESENTATIONS,
} from '../actions/presentation_actions';

const NULL_PRESENTATION = {
  activePollId: null,
  participant: {},
  recents: []
}

export default (state = NULL_PRESENTATION, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ACTIVE_POLL:
      return Object.assign({}, state, {
        activePollId: action.data.poll ? action.data.poll.id : null,
        participant: action.data.participant || state.participant
      });
    case RECEIVE_PARTICIPANT:
      return Object.assign({}, state, { participant: action.participant } );
    case CLEAR_ACTIVE_POLL:
      return Object.assign({}, state, {activePollId: null})
    case CLEAR_PRESENTATION:
      return NULL_PRESENTATION;
    case RECEIVE_RECENT_PRESENTATIONS:
      return Object.assign({}, state, 
        {recents: action.recents.map( recent => recent.username )}
      );
    default:
      return state;
  }
}