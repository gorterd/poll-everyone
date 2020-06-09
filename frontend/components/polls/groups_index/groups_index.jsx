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
    const { orderedGroups, openModal, stickyToolbar } = this.props;
    
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
            {...this.props}
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