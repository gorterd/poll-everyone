import React from 'react';
import GroupSearch from '../../shared/group_search';

class MoveDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      group: undefined,
    }
    
    this.setGroup = this.setGroup.bind(this);
    this.movePolls = this.movePolls.bind(this);
  };

  setGroup(group){
    this.setState({ group });
  }

  movePolls(){
    const groupId = this.state.group ? this.state.group.id : 'No group';
    console.log(`Move ${this.props.selections.pollIds.join(', ')} to group ${groupId}`)
  }

  render() {
    const { groups, selections, visible, toggleVisible } = this.props;
    const { group } = this.state;

    const numSelections = selections.pollIds.length;
    const buttonText = `Apply to ${numSelections} activit${ numSelections === 1 ? 'y' : 'ies' }`;

    return (
      <div className='move-drawer-anchor'>
        <div className={'move-drawer-container' + ( visible ? ' open' : '')}>
          <div className='move-drawer-wrapper'>
            <h1>Move</h1>

            <div className='move-drawer-search-container'>
              <span>To another group: </span>
              <GroupSearch
                activeGroup={group}
                setGroup={this.setGroup}
                groups={groups}
                placeholderText='Search group name'
              />
            </div>

            <div className='move-buttons'>
              <button className='button-blue' onClick={this.movePolls} disabled={!group}>{buttonText}</button>
              <button className='button-transparent' onClick={toggleVisible}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default MoveDrawer;