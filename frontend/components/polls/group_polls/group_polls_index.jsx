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
    this.state = { drawerVisible: (this.props.group.ord == 0) }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.rename = this.rename.bind(this);
    this.duplicate = this.duplicate.bind(this);
  };

  toggleDrawer(){
    console.log(`${this.state.drawerVisible ? "hide" : "show"} drawer`)
    this.setState({drawerVisible: !this.state.drawerVisible})
  }
  
  toggleSelectGroup(e){
    console.log(`${this.state.groupSelected ? "un" : ""}select group`)
    this.setState({groupSelected: e.target.checked}, ({groupSelected}) => {
      if (!groupSelected){

      }
    })
    this.props.updateSelection
  }

  addActivity(){
    console.log('Add activity')
    this.props.openModal(
      {type: 'new-poll', data: { group: this.group } }
    );
  }

  rename(){
    console.log('Rename')
    
  }

  duplicate(){
    console.log('Duplicate')
    
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
      <div>
        <GroupHeader {...headerProps} />
        <ul className={"group-polls-list "+ ( drawerVisible ? "" : "hidden")}>
          {orderedPolls.map(poll => {
            return <PollListItem key={poll.id} poll={poll} selections={selections} />
          })}
        </ul>
      </div>
    )
  }
};

export default GroupPollsIndex;