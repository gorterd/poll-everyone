import React from 'react';
import _throttle from 'lodash.throttle';

import DropdownWrapper from '../../shared/dropdown';
import NewPollToolbar from '../modals/new_poll/new_poll_toolbar';

const OFFSET = 78;

class GroupsIndexToolbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = { sticky: false }
    this.el = React.createRef();

    this.openNewGroupModal = this.openNewGroupModal.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.ungroup = this.ungroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  };

  componentDidMount() {
    this.scrollListener = window.addEventListener('scroll', _throttle(() => { this.handleScroll() },
      20, { leading: false, trailing: true }));
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollListener);
  }

  handleScroll(){
    const { stickyToolbar, modalType } = this.props;
    const scrollY = window.scrollY;
    const nowSticky = OFFSET < scrollY;

    if (!stickyToolbar && nowSticky) {
      this.props.setStickyToolbar(56);
    } else if (stickyToolbar && !(nowSticky || modalType)) {
      this.props.clearStickyToolbar();
    }
  }

  openNewGroupModal() {
    this.props.openModal({
      type: 'new-group',
      data: this.props.selections,
      offset: this.props.stickyToolbar
    })
  }

  selectAll(){
    const { groups, receiveSelections  } = this.props;
    const groupIds = groups.map( group => group.id );
    const pollIds = groups.reduce( (acc, group) => acc.concat(group.pollIds), [] );
    receiveSelections({ groupIds, pollIds });
  }

  ungroup(){
    const { groups, selections, movePolls } = this.props;
    movePolls(selections.pollIds, groups.find( g => g.ord === 0).id);
  }

  render() {
    const { batchDestroy, clearSelections, selections, openModal, 
      modalType, modalExiting, stickyToolbar, toggleMoveDrawer } = this.props;
    const { selectAll } = this;

    const Button = () => <span className='button-grey'><i className="fas fa-check"></i></span>

    const Dropdown = () => (
      <ul>
        <span className='button-white' onClick={selectAll}>All</span>
        <span className='button-white' onClick={clearSelections}>None</span>
      </ul>
    )

    const noSelection = !(selections.groupIds.length || selections.pollIds.length); 

    const createButton = stickyToolbar ? 
      <div className='polls-sidebar'>
        <button 
          className='button-blue' 
          onClick={() => openModal({ 
            type: 'new-poll', 
            data: { }, 
            offset: stickyToolbar 
          })}
        >Create</button>
      </div>
      : null;

    const toolbar = ((modalType == 'new-poll' && !modalExiting ) && stickyToolbar) ? <NewPollToolbar /> : (
      <>
        {createButton}

        <DropdownWrapper button={Button} dropdown={Dropdown} containerClass='group-select-dropdown' />

        <button className='button-grey' onClick={this.openNewGroupModal}>New group</button>
        <button className='button-grey' onClick={this.ungroup} disabled={noSelection}>Ungroup</button>
        <button className='button-grey' onClick={() => batchDestroy(selections)} disabled={noSelection}>Delete</button>
        <button className='button-grey' onClick={toggleMoveDrawer} disabled={noSelection}>Move</button>
      </>
    )

    return  (
      <div 
        className={'groups-index-toolbar ' + ( stickyToolbar ? 'sticky-toolbar' : '')}
        ref={this.el}
      >
        {toolbar}
      </div>
    ) 
  }
};



export default GroupsIndexToolbar;