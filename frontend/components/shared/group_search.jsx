import React, { useEffect, useReducer, useRef } from 'react';

const initialState = {
  query: '',
  matchingGroups: [],
  searching: false,
  groupsOpen: false,
  focusIndex: null,
};

const CLOSE_SEARCH = 'CLOSE_SEARCH';
const UPDATE_SEARCH = 'UPDATE_SEARCH';
const KEY_MOVE = 'KEY_MOVE';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function reducer(state, action) {
  switch (action.type) {
    case CLOSE_SEARCH:
      return {
        ...state,
        searching: false,
        groupsOpen: false,
        focusIndex: null,
        matchingGroups: [],
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        searching: true,
        groupsOpen: true,
        focusIndex: null,
        ...action.payload
      };
    case KEY_MOVE:
      const { dir, defaultIndex, groups } = action;
      const { focusIndex, matchingGroups } = state;
      const drawerGroups = matchingGroups.length ? matchingGroups : groups;

      const newFocusIndex = focusIndex === null 
        ? defaultIndex 
        : clamp((focusIndex + dir), 0, drawerGroups.length - 1);

      return { ...state, focusIndex: newFocusIndex };
    case TOGGLE_DRAWER:
      return { ...state, groupsOpen: state.groupsOpen }
    default:
      return new Error("Action type doesn't exist");
  }
}

export default function GroupSearch({ setGroup, focusOnTab, groups, activeGroup, placeholderText }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const disableUnfocus = useRef(false);
  const inputFocused = useRef(false);
  const searchField = useRef();
  const groupListItems = useRef([]);

  function textMatchesGroup(text) {
    return group => new RegExp(`^${text}`, 'i').test(group.title);
  }

  function clickGroup(group) {
    setGroup(group);
    disableUnfocus.current = true;
    dispatch({ type: CLOSE_SEARCH });
  }

  function submitGroup(title) {
    const chosenGroup = groups.find(textMatchesGroup(title));
    setGroup(chosenGroup);
    dispatch({ type: CLOSE_SEARCH });
  }

  function searchHandler(e) {
    const query = e.target.value;
    const matchingGroups = groups.filter(textMatchesGroup(query));

    dispatch({ 
      type: UPDATE_SEARCH, 
      payload: { query, matchingGroups }
    });
  }

  function handleKeyDown(e) {
    if (!groupsOpen) return;
  
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        dispatch({ type: KEY_MOVE, dir: 1, defaultIndex: 0, groups })
        break;
      case 'ArrowUp':
        e.preventDefault();
        dispatch({ type: KEY_MOVE, dir: -1, defaultIndex: null, groups })
        break;
      case 'Tab':
        if (focusOnTab) {
          e.preventDefault();
          focusOnTab.disabled = false;
          focusOnTab.focus();
        }
    }  
  }

  function leaveInput(e) {
    const { focusIndex, matchingGroups } = state;
    const drawerGroups = matchingGroups.length ? matchingGroups : groups;
    inputFocused.current = false;
    let query = e.target.value;
    let focusedGroup = drawerGroups[focusIndex];

    window.setTimeout(() => {
      if (!disableUnfocus.current) {
        if (focusedGroup) {
          submitGroup(focusedGroup.title);
        } else if (query) {
          submitGroup(query)
        } else {
          setGroup(undefined);
          dispatch({ type: CLOSE_SEARCH });
        }
      }
    }, 10)
  }

  function toggleDrawer() {
    disableUnfocus.current = true;
    dispatch({ type: TOGGLE_DRAWER });
  }

  function focusInput(e) {
    disableUnfocus.current = true;
    inputFocused.current = true;
    searchHandler(e);
  }

  function clearSearch() {
    searchField.current.focus();
    disableUnfocus.current = true;
    inputFocused.current = true;
    dispatch({ type: UPDATE_SEARCH, payload: { matchingGroups: [], query: '' }})
  }

  function unfocus() {
    disableUnfocus.current = false;
    window.setTimeout(() => {
      if (!disableUnfocus.current && !inputFocused.current) {
        dispatch({ type: CLOSE_SEARCH });
      }
      disableUnfocus.current = false;
    }, 50);
  }

  useEffect(() => {
    const listItem = groupListItems.current[focusIndex];
    if (!listItem) return;

    const list = listItem.parentElement;
    
    if (searchField.current.getBoundingClientRect().top < 0) {
      searchField.current.scrollIntoView(true);
    } else if (list.getBoundingClientRect().bottom > window.innerHeight) {
      list.scrollIntoView(true);
    }

    const itemTop = listItem.offsetTop;
    const itemBottom = itemTop + listItem.offsetHeight;

    if (list.scrollTop > itemTop) {
      list.scrollTop = itemTop;
    } else if (itemBottom > (list.scrollTop + list.offsetHeight)) {
      list.scrollTop = itemBottom - list.offsetHeight;
    }
  }, [state.focusIndex, groupListItems]);
  

  const { query, searching, matchingGroups, focusIndex, groupsOpen} = state;
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
    <div className='group-search-container' tabIndex='0' onBlur={unfocus}>
      <form onSubmit={e => {
        e.preventDefault();
        submitGroup(searchText);
      }}>
        <input
          ref={searchField}
          type="text"
          className='group-search-input'
          placeholder={placeholderText}
          value={searchText}
          tabIndex='1'
          onChange={searchHandler}
          onBlur={leaveInput}
          onFocus={focusInput}
          onKeyDown={handleKeyDown}
        />
        <span className='clear-group-search' onClick={clearSearch}>
          <i className="fas fa-times"></i>
        </span>
      </form>

      <button onClick={toggleDrawer} className='button-grey'>
        <i className={`fas fa-chevron-${groupsOpen ? 'up' : 'down'}`}></i></button>
      <ul className={'group-search-list' + (groupsOpen ? '' : ' hidden')}>
        {drawerGroups.map((group, idx) => (
          <li 
            key={group.id}
            className={focusIndex === idx ? 'focused' : ''}
            onClick={() => clickGroup(group)}
            ref={li => groupListItems.current[idx] = li}
          >
            {group.title}
          </li>
        ))}
      </ul>
    </div>
  )

};

// class GroupSearch extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       query: '',
//       matchingGroups: [],
//       searching: false,
//       groupsOpen: false,
//       focusIndex: null
//     }

//     this.disableUnfocus = false;
//     this.inputFocused = false;
//     this.groupListItems = [];

//     this.clickGroup = this.clickGroup.bind(this);
//     this.submitGroup = this.submitGroup.bind(this);
//     this.searchHandler = this.searchHandler.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//     this.leaveInput = this.leaveInput.bind(this);
//     this.toggleDrawer = this.toggleDrawer.bind(this);
//     this.unfocus = this.unfocus.bind(this);
//     this.focusInput = this.focusInput.bind(this);
//     this.clearSearch = this.clearSearch.bind(this);
//   };

//   clickGroup(group) {
//     this.props.setGroup(group);
//     this.disableUnfocus = true;
//     this.setState({ searching: false, groupsOpen: false, focusIndex: null, matchingGroups: [] })
//   }

//   submitGroup(title) {
//     let query = new RegExp(`^${title}`, 'i');
//     let chosenGroup = this.props.groups.find(group => query.test(group.title));
//     this.props.setGroup(chosenGroup);
//     this.setState({ searching: false, groupsOpen: false, focusIndex: null, matchingGroups: [] })
//   }

//   searchHandler(e) {
//     let query = e.target.value;
//     let matchingGroups = this.props.groups.filter(group => new RegExp(`^${query}`, 'i').test(group.title));

//     this.setState({
//       searching: true,
//       focusIndex: null,
//       groupsOpen: true,
//       query,
//       matchingGroups
//     });
//   }

//   handleKeyDown(e) {
//     const { focusIndex, groupsOpen, matchingGroups } = this.state;
//     const drawerGroups = matchingGroups.length ? matchingGroups : this.props.groups;
    
//     if ( groupsOpen ) {
//       let newFocusIndex = focusIndex;
//       let listItem;
//       switch (e.key) {
//         case 'ArrowDown':
//           e.preventDefault();
//           if (focusIndex !== null & focusIndex < drawerGroups.length - 1){
//             newFocusIndex = focusIndex + 1;
//           } else if (focusIndex === null){
//             newFocusIndex = 0;
//           }
//           listItem = this.groupListItems[newFocusIndex];
//           this._scrollIntoView(listItem, false);
//           break;
//         case 'ArrowUp':
//           e.preventDefault();
//           if (focusIndex !== null & focusIndex > 0) {
//             newFocusIndex = focusIndex - 1;
//           }
//           listItem = this.groupListItems[newFocusIndex];
//           this._scrollIntoView(listItem);
//           break;
//         case 'Tab':
//           const { focusOnTab } = this.props;
//           if(focusOnTab){
//             e.preventDefault();
//             focusOnTab.disabled = false;
//             focusOnTab.focus();
//           }
//       }
//       this.setState({ focusIndex: newFocusIndex });
//     }

//   }

//   leaveInput(e) {
//     const { focusIndex, matchingGroups } = this.state;
//     const drawerGroups = matchingGroups.length ? matchingGroups : this.props.groups;
//     this.inputFocused = false;
//     let query = e.target.value;
   
//     let focusedGroup = drawerGroups[focusIndex];

//     window.setTimeout ( () => {
//       if (!this.disableUnfocus){
//         if (focusedGroup){
//           this.submitGroup(focusedGroup.title);
//         } else if (query) {
//           this.submitGroup(query)
//         } else {
//           this.props.setGroup(undefined);
//           this.setState({ query: '', searching: false, focusIndex: null, matchingGroups: [] })
//         }
//       }
//     }, 10)
//   }

//   toggleDrawer() {
//     this.disableUnfocus = true;
//     this.setState({ groupsOpen: !this.state.groupsOpen })
//   }

//   focusInput(e){
//     this.disableUnfocus = true;
//     this.inputFocused = true;
//     this.searchHandler(e);
//   }

//   clearSearch(){
//     this.search.focus();
//     this.disableUnfocus = true;
//     this.inputFocused = true;
//     this.setState({ searching: true, query: '', matchingGroups: [], focusIndex: null })
//   }

//   unfocus(){
//     this.disableUnfocus = false;
//     window.setTimeout( () => {
//       if (!this.disableUnfocus && !this.inputFocused) {
//         this.setState({ groupsOpen: false, matchingGroups: [], focusIndex: null,  });
//       }
//       this.disableUnfocus = false;
//     }, 50);
//   }

//   _scrollIntoView(listItem, up = true){
//     const list = listItem.parentElement;
//     const itemTop = listItem.offsetTop;
//     const itemBottom = itemTop + listItem.offsetHeight;

//     if (up && (list.scrollTop > itemTop)){
//       list.scrollTop = itemTop;
//     } else if ( !up ){
//       if (window.innerHeight < list.getBoundingClientRect().bottom){
//         listItem.scrollIntoView(false);
//       } else if (itemBottom > list.scrollTop + list.offsetHeight) {
//         list.scrollTop = itemBottom - list.offsetHeight;
//       }
//     }
//   }

//   render() {
//     const { groups, activeGroup, placeholderText } = this.props;
//     const { searching, query, groupsOpen, focusIndex, matchingGroups } = this.state;
//     const drawerGroups = matchingGroups.length ? matchingGroups : groups;

//     let searchText;
//     if (groupsOpen && focusIndex !== null) {
//       searchText = drawerGroups[focusIndex].title;
//     } else if (searching && query) {
//       searchText = query;
//     } else if (activeGroup && !searching) {
//       searchText = activeGroup.title;
//     } else {
//       searchText = '';
//     }

//     return (
//       <div className='group-search-container' tabIndex='0' onBlur={this.unfocus}>
//         <form onSubmit={e => {
//           e.preventDefault();
//           this.submitGroup(searchText);
//         }}>
//           <input
//             ref={ search => this.search = search }
//             type="text"
//             className='group-search-input'
//             placeholder={placeholderText}
//             value={searchText}
//             tabIndex='1'
//             onChange={this.searchHandler}
//             onBlur={this.leaveInput}
//             onFocus={this.focusInput}
//             onKeyDown={this.handleKeyDown}
//           />
//           <span className='clear-group-search' onClick={this.clearSearch}>
//             <i className="fas fa-times"></i>
//           </span>
//         </form>

//         <button onClick={this.toggleDrawer} className='button-grey'>
//           <i className={`fas fa-chevron-${ groupsOpen ? 'up' : 'down'}`}></i></button>
//         <ul className={'group-search-list' + (groupsOpen ? '' : ' hidden')}>
//           {drawerGroups.map((group, idx) => (
//             <li key={group.id} 
//               className={focusIndex === idx ? 'focused' : ''} 
//               onClick={() => this.clickGroup(group)}
//               ref={ li => this.groupListItems[idx] = li}
//             >
//               {group.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// };

// export default GroupSearch;

