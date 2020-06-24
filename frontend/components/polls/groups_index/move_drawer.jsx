import React from 'react';
import GroupSearch from '../../shared/group_search';
import { closeModal } from '../../../actions/ui_actions';

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
    const { groups, selections, movePolls, openModal, closeModal, stickyToolbar, toggleVisible } = this.props;
    const groupId = this.state.group ? this.state.group.id : groups.find( g => g.ord === 0 ).id;
    const pollIds = selections.pollIds;
    const sendMoveRequest = () => movePolls(pollIds, groupId).then( () => {
      closeModal();
      toggleVisible();
      this.setState({ group: undefined });
    });
    openModal({
      type: 'confirm-move',
      data: { sendMoveRequest, numPolls: pollIds.length },
      offset: stickyToolbar
    });
  }

  render() {
    const { groups, selections, visible, toggleVisible } = this.props;
    const { group } = this.state;

    const numSelections = selections.pollIds.length;
    const buttonText = `Apply to ${numSelections} poll${ numSelections === 1 ? '' : 's' }`;
    const disabled = !group || selections.pollIds.length === 0;

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
                focusOnTab={ numSelections ? this.moveButton : this.cancelButton }
              />
            </div>

            <div className='move-buttons'>
              <button 
                className='button-blue' 
                onClick={this.movePolls} 
                ref={e => this.moveButton = e }
                disabled={disabled}
                >{buttonText}</button>

              <button 
                className='button-transparent' 
                onClick={toggleVisible}
                ref={e => this.cancelButton = e }
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default MoveDrawer;