import React from 'react';

class GroupSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      matchingGroups: [],
      searching: false,
      groupsOpen: false,
      focusIndex: null
    }

    this.disableUnfocus = false;
    this.inputFocused = false;
    this.groupListItems = [];

    this.clickGroup = this.clickGroup.bind(this);
    this.submitGroup = this.submitGroup.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.leaveInput = this.leaveInput.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.unfocus = this.unfocus.bind(this);
  };

  clickGroup(group) {
    this.props.setGroup(group);
    this.disableUnfocus = true;
    this.setState({ searching: false, groupsOpen: false, focusIndex: null, matchingGroups: [] })
  }

  submitGroup(title) {
    let query = new RegExp(`^${title}`, 'i');
    let chosenGroup = this.props.groups.find(group => query.test(group.title));
    this.props.setGroup(chosenGroup);
    this.setState({ searching: false, groupsOpen: false, focusIndex: null, matchingGroups: [] })
  }

  searchHandler(e) {
    let query = e.target.value;
    let matchingGroups = this.props.groups.filter(group => new RegExp(`^${query}`, 'i').test(group.title));

    this.setState({
      searching: true,
      focusIndex: null,
      groupsOpen: true,
      query,
      matchingGroups
    });
  }

  handleKeyDown(e) {
    const { focusIndex, groupsOpen, matchingGroups } = this.state;
    const drawerGroups = matchingGroups.length ? matchingGroups : this.props.groups;
    
    if ( groupsOpen ) {
      let newFocusIndex = focusIndex;
      let listItem;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (focusIndex !== null & focusIndex < drawerGroups.length - 1){
            newFocusIndex = focusIndex + 1;
          } else if (focusIndex === null){
            newFocusIndex = 0;
          }
          listItem = this.groupListItems[newFocusIndex];
          this._scrollIntoView(listItem, false);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (focusIndex !== null & focusIndex > 0) {
            newFocusIndex = focusIndex - 1;
          }
          listItem = this.groupListItems[newFocusIndex];
          this._scrollIntoView(listItem);
          break;
        case 'Tab':
          const { focusOnTab } = this.props;
          if(focusOnTab){
            e.preventDefault();
            focusOnTab.disabled = false;
            focusOnTab.focus();
          }
      }
      this.setState({ focusIndex: newFocusIndex });
    }

  }

  leaveInput(e) {
    const { focusIndex, matchingGroups } = this.state;
    const drawerGroups = matchingGroups.length ? matchingGroups : this.props.groups;
    this.inputFocused = false;
    let query = e.target.value;
   
    let focusedGroup = drawerGroups[focusIndex];

    window.setTimeout ( () => {
      if (!this.disableUnfocus){
        if (focusedGroup){
          this.submitGroup(focusedGroup.title);
        } else if (query) {
          this.submitGroup(query)
        } else {
          this.props.setGroup(undefined);
          this.setState({ query: '', searching: false, focusIndex: null, matchingGroups: [] })
        }
      }
    }, 10)
  }

  toggleDrawer() {
    this.disableUnfocus = true;
    this.setState({ groupsOpen: !this.state.groupsOpen })
  }

  unfocus(){
    this.disableUnfocus = false;
    window.setTimeout( () => {
      if (!this.disableUnfocus && !this.inputFocused) {
        this.setState({ groupsOpen: false, matchingGroups: [], focusIndex: null,  });
      }
      this.disableUnfocus = false;
    }, 50);
  }

  _scrollIntoView(listItem, up = true){
    const list = listItem.parentElement;
    const itemTop = listItem.offsetTop;
    const itemBottom = itemTop + listItem.offsetHeight;

    if (up && (list.scrollTop > itemTop)){
      list.scrollTop = itemTop;
    } else if ( !up ){
      if (window.innerHeight < list.getBoundingClientRect().bottom){
        listItem.scrollIntoView(false);
      } else if (itemBottom > list.scrollTop + list.offsetHeight) {
        list.scrollTop = itemBottom - list.offsetHeight;
      }
    }
  }

  render() {
    const { groups, activeGroup, placeholderText } = this.props;
    const { searching, query, groupsOpen, focusIndex, matchingGroups } = this.state;
    const drawerGroups = matchingGroups.length ? matchingGroups : groups;

    let searchText;
    if (groupsOpen && focusIndex !== null) {
      searchText = drawerGroups[focusIndex].title;
    } else if (searching && query) {
      searchText = query;
    } else if (activeGroup && !searching) {
      searchText = activeGroup.title;
    } else {
      searchText = '';
    }

    return (
      <div className='group-search-container' tabIndex='0' onBlur={this.unfocus}>
        <form onSubmit={e => {
          e.preventDefault();
          this.submitGroup(searchText);
        }}>
          <input
            ref={ search => this.search = search }
            type="text"
            className='group-search-input'
            placeholder={placeholderText}
            value={searchText}
            tabIndex='1'
            onChange={this.searchHandler}
            onBlur={this.leaveInput}
            onFocus={ e => {
              this.disableUnfocus = true;
              this.inputFocused = true;
              this.searchHandler(e);
            }}
            onKeyDown={this.handleKeyDown}
          />
          <span className='clear-group-search' onClick={(e) =>{
            this.search.focus();
            this.disableUnfocus = true;
            this.inputFocused = true;
            this.setState({searching: true, query: '', matchingGroups: [], focusIndex: null})
          }}><i className="fas fa-times"></i></span>
        </form>

        <button onClick={this.toggleDrawer} className='button-grey'>
          <i className={`fas fa-chevron-${ groupsOpen ? 'up' : 'down'}`}></i></button>
        <ul className={'group-search-list' + (groupsOpen ? '' : ' hidden')}>
          {drawerGroups.map((group, idx) => (
            <li key={group.id} 
              className={focusIndex === idx ? 'focused' : ''} 
              onClick={() => this.clickGroup(group)}
              ref={ li => this.groupListItems[idx] = li}
            >
              {group.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
};

export default GroupSearch;

