import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { orderedGroupPolls } from "../../../util/selectors";
import { duplicatePoll } from "../../../actions/poll_actions";
import { receivePollSelection, clearPollSelection } from '../../../actions/selection_actions/poll_selection_actions';
import GroupPollsIndex from './group_polls_index';

const mapState = (state, ownProps) => {
  return {
    orderedPolls: orderedGroupPolls(state, ownProps.group.id) || [],
  }
}

const mapDispatch = dispatch => {
  return {
    receivePollSelection: data => dispatch(receivePollSelection(data)),
    clearPollSelection: data => dispatch(clearPollSelection(data)),
    duplicatePoll: pollId => dispatch(duplicatePoll(pollId)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(GroupPollsIndex));