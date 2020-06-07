import React from 'react';
import GroupHeader from './group_header'

const PollListItem = ({poll}) => {
  return (
    <li>
      <span>
        {poll.pollType} 
        {poll.title}
      </span>
    </li>
  )
}


class GroupPollsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { drawerVisible: (this.props.group.ord == 0), groupSelected: false }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleSelectGroup = this.toggleSelectGroup.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.rename = this.rename.bind(this);
    this.duplicate = this.duplicate.bind(this);
  };

  toggleDrawer(){
    console.log(`${this.state.drawerVisible ? "hide" : "show"} drawer`)
    this.setState({drawerVisible: !this.state.drawerVisible})
  }
  
  toggleSelectGroup(){
    console.log(`${this.state.groupSelected ? "un" : ""}select group`)
    this.setState({groupSelected: !this.state.groupSelected})
  }

  addActivity(){
    console.log('Add activity')
    this.props.openModal('new-poll');
  }

  rename(){
    console.log('Rename')
    
  }

  duplicate(){
    console.log('Duplicate')
    
  }

  render() {
    const { group, orderedPolls } = this.props;
    const { drawerVisible, groupSelected }  = this.state;

    const headerProps = {
      group, drawerVisible,
      toggleDrawer: this.toggleDrawer,
      toggleSelectGroup: this.toggleSelectGroup,
      addActivity: this.addActivity,
      rename: this.rename,
      duplicate: this.duplicate,
    }

    return (
      <li>
        <GroupHeader {...headerProps} />
        <ul className={"group-polls-list "+ ( drawerVisible ? "" : "hidden")}>
          {orderedPolls.map(poll => {
            return <PollListItem key={poll.id} poll={poll} />
          })}
        </ul>
      </li>
    )
  }
};

export default GroupPollsIndex;