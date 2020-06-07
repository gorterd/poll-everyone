import React from 'react';
import { orderedGroups } from '../../../util/selectors';
import GroupPollsIndexContainer from '../group_polls/group_polls_index_container';
import GroupsIndexToolbar from './groups_index_toolbar';

class GroupsIndex extends React.Component {
  constructor(props) {
    super(props)

    this.batchDestroy = this.batchDestroy.bind(this)
  };

  componentDidMount(){
    this.props.fetchGroups(this.props.currentUserId)
  }

  batchDestroy() {
    this.props.batchDestroy(this.props.selections);
  }

  render() {
    const { orderedGroups, selections, receiveGroupSelection, clearGroupSelection, clearSelections } = this.props;
    
    return (
      <section className="groups-index">
        <GroupsIndexToolbar batchDestroy={this.batchDestroy} selections={selections} clearSelections={clearSelections}/>
        {orderedGroups.map( group => {
          return <GroupPollsIndexContainer 
            key={group.id} 
            group={group} 
            selections={selections} 
            receiveGroupSelection={receiveGroupSelection}
            clearGroupSelection={clearGroupSelection}
          />
        })}
      </section>
    )
  }
};

export default GroupsIndex;