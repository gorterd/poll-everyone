import React from 'react';
import { orderedGroups } from '../../util/selectors';
import GroupPollsIndexContainer from './group_polls_index_container';

class GroupsIndex extends React.Component {
  constructor(props) {
    super(props)
    
  };

  componentDidMount(){
    this.props.fetchGroups(this.props.currentUserId)
  }

  render() {


    
    return (
      <ul>
        {this.props.orderedGroups.map( group => {
          return <GroupPollsIndexContainer key={group.id} group={group} />
        })}
      </ul>
    )
  }
};

export default GroupsIndex;