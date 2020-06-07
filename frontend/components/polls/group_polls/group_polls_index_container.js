import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { orderedGroupPolls } from "../../../util/selectors";
import { } from "../../../actions/poll_actions";
import { openModal } from "../../../actions/ui_actions";
import GroupPollsIndex from './group_polls_index';

const mapState = (state, ownProps) => {
  return {
    orderedPolls: orderedGroupPolls(state, ownProps.group.id) || [],
  }
}

const mapDispatch = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal))
  }
}

export default withRouter(connect(mapState, mapDispatch)(GroupPollsIndex));