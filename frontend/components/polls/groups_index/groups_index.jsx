import React from 'react';
import { orderedGroups } from '../../../util/selectors';
import GroupPollsIndexContainer from '../group_polls/group_polls_index_container';
import GroupsIndexToolbar from './groups_index_toolbar';
import MoveDrawer from './move_drawer';

class GroupsIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = { moveDrawerVisible: false }

    this.batchDestroy = this.batchDestroy.bind(this)
    this.toggleMoveDrawer = this.toggleMoveDrawer.bind(this)
  };

  componentDidMount(){
    this.props.fetchGroups(this.props.currentUserId)
  }

  batchDestroy() {
    this.props.batchDestroy(this.props.selections);
  }

  toggleMoveDrawer(){
    if (this.props.stickyToolbar) {
      window.scrollTo({top: 75, behavior: "smooth"});
    }
    this.setState({ moveDrawerVisible: !this.state.moveDrawerVisible });
  }

  render() {
    const { orderedGroups, openModal, closeModal, stickyToolbar, selections, movePolls } = this.props;
    
    return (
      <section className="polls-index">

        <aside className='polls-sidebar'>
          <button 
            className={'button-blue' + (stickyToolbar ? ' hidden' : '') }
            onClick={ () => openModal({
              type:'new-poll', 
              data: {}, 
              offset: 72 })}
          >Create</button>
        </aside>

        <section className='groups-index-container'>
          <GroupsIndexToolbar 
            batchDestroy={this.batchDestroy} 
            groups={orderedGroups}
            toggleMoveDrawer={this.toggleMoveDrawer}
            {...this.props}
          />

          <MoveDrawer 
            visible={this.state.moveDrawerVisible} 
            toggleVisible={this.toggleMoveDrawer} 
            groups={orderedGroups}
            selections={selections}
            movePolls={movePolls}
            openModal={openModal}
            closeModal={closeModal}
            stickyToolbar={stickyToolbar}
          /> 

          <div className='groups-index'>
            {orderedGroups.map( group => {
              return <GroupPollsIndexContainer 
                key={group.id} 
                group={group} 
                {...this.props}
              />
            })}
          </div>
        </section>
      </section>
    )
  }
};

export default GroupsIndex;