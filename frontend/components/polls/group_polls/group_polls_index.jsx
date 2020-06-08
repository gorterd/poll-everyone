import React from 'react';
import GroupHeader from './group_header';
import PollListItem from './poll-list-item';

class GroupPollsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { drawerVisible: (this.props.group.ord == 0) }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.rename = this.rename.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.togglePollSelect = this.togglePollSelect.bind(this);
  };

  toggleDrawer(){
    this.setState({drawerVisible: !this.state.drawerVisible})
  }

  addActivity(e) {
    e.stopPropagation();
    const { openModal, stickyToolbar } = this.props;
    
    openModal({
      type: 'new-poll', 
      data: { group: this.group }, 
      offset: ( stickyToolbar || 72 )
    });
  }

  rename(e) {
    console.log('Rename')
    e.stopPropagation()
  }

  duplicate(e) {
    e.stopPropagation()
    console.log('Duplicate') 
  }

  togglePollSelect(pollId, selected) {
    const { group, receivePollSelection, clearPollSelection } = this.props;
    if (selected) {
      receivePollSelection({ group, pollId });
    } else {
      clearPollSelection({ group, pollId});
    }
  }

  render() {
    const { group, selections, receiveGroupSelection, clearGroupSelection, orderedPolls } = this.props;
    const { drawerVisible }  = this.state;

    const headerProps = {
      group, drawerVisible, selections, receiveGroupSelection, clearGroupSelection,
      toggleDrawer: this.toggleDrawer,
      addActivity: this.addActivity,
      rename: this.rename,
      duplicate: this.duplicate,
    }

    return (
      <div className='group-polls-index-container'>
        <GroupHeader {...headerProps} />
        <ul className={"group-polls-index "+ ( drawerVisible ? "" : "hidden")}>
          {orderedPolls.map(poll => {
            return <PollListItem 
              key={poll.id} 
              poll={poll} 
              selections={selections} 
              togglePollSelect={this.togglePollSelect}
            />
          })}
        </ul>
      </div>
    )
  }
};

export default GroupPollsIndex;