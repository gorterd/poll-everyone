import React from 'react';

class GroupSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      groupsOpen: false,
      searching: false,
    }
    this.disableUnfocus = false,

    this.clickGroup = this.clickGroup.bind(this);
    this.submitGroup = this.submitGroup.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.leaveInput = this.leaveInput.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.unfocus = this.unfocus.bind(this);
  };

  clickGroup(group) {
    this.props.setGroup(group);
    this.disableUnfocus = true;
    this.setState({ searching: false, groupsOpen: false })
  }

  submitGroup(title) {
    let query = new RegExp(`^${title}`, 'i');
    let chosenGroup = this.props.groups.find(group => query.test(group.title));
    this.props.setGroup(chosenGroup);
    this.setState({ searching: false, groupsOpen: false })
  }

  searchHandler(e) {
    let query = e.target.value;
    let groupsOpen = this.props.groups.some(group => new RegExp(`^${query}`, 'i').test(group.title));
    this.setState({
      searching: true,
      query,
      groupsOpen
    });
  }

  leaveInput(e) {
    let query = e.target.value;
    if (query) {
      this.submitGroup(e.target.value)
    } else {
      this.props.setGroup(undefined);
      this.setState({ query: '', searching: false })
    }
  }

  toggleDrawer() {
    this.disableUnfocus = true;
    this.setState({ groupsOpen: !this.state.groupsOpen })
  }

  unfocus(){
    this.disableUnfocus = false;
    window.setTimeout( () => {
      if (!this.disableUnfocus) {
         this.setState({ groupsOpen: false });
      }
      this.disableUnfocus = false;
    }, 10);
  }

  render() {
    const { groups, activeGroup, placeholderText } = this.props;
    const { searching, query, groupsOpen } = this.state;

    let searchText, matchingGroups;
    if (searching && query) {
      searchText = query;
      matchingGroups = groups.filter(group => new RegExp(`^${query}`, 'i').test(group.title));
    } else if (activeGroup && !searching) {
      searchText = activeGroup.title;
    } else {
      searchText = '';
    }
    const drawerGroups = matchingGroups || groups;

    return (
      <div className='group-search-container' tabIndex='0' onBlur={this.unfocus}>
        <form onSubmit={e => {
          e.preventDefault();
          this.submitGroup(query);
        }}><input
            type="text"
            className='group-search-input'
            placeholder={placeholderText}
            value={searchText}
            tabIndex='1'
            onChange={this.searchHandler}
            onBlur={this.leaveInput}
          />
        </form>

        <button onClick={this.toggleDrawer} className='button-grey'>
          <i className={`fas fa-chevron-${ groupsOpen ? 'up' : 'down'}`}></i></button>
        <ul className={'group-search-list' + (groupsOpen ? '' : ' hidden')}>
          {drawerGroups.map(group => (
            <li key={group.id} onClick={() => this.clickGroup(group)}>
              {group.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
};

export default GroupSearch;

