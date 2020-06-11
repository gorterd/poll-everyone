import { RECEIVE_POLL } from '../../actions/poll_actions';
import {
  RECEIVE_ACTIVE_POLL,
  RECEIVE_RESPONSE,
  CLEAR_RESPONSE
} from '../../actions/presentation_actions';
import { concatIfNew } from '../../util/general_util';

export default (state = {}, action) => {
  Object.freeze(state);
  let oldAnswerOption, newAnswerOption;
  switch (action.type) {
    case RECEIVE_POLL:
      return Object.assign({}, action.data.answerOptions );
    case RECEIVE_ACTIVE_POLL:
      return Object.assign({}, state, action.data.answerOptions );
    case RECEIVE_RESPONSE:
      newAnswerOption = state[action.response.answerOptionId] ||
        ({ [action.response.answerOptionId]: {} });

      newAnswerOption.responseIds = concatIfNew(newAnswerOption.responseIds, action.response.id);
      return Object.assign({}, state, { [newAnswerOption.id] : newAnswerOption } );
    case CLEAR_RESPONSE:
      newAnswerOption = Array.from( state[action.response.answerOptionId] ) ||
        ({ [action.response.answerOptionId]: {} });

      const responseIds = newAnswerOption.responseIds;
      if (responseIds) {
        newResponseIds = Array.from(responseIds);
        newResponseIds.splice( responseIds.indexOf(action.response.id), 1 );
        newAnswerOption.responseIds = newResponseIds;
      }
      return Object.assign({}, state, { [newAnswerOption.id]: newAnswerOption });
    default:
      return state;
  }
}