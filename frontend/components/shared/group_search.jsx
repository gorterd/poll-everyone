import React, { useEffect, useReducer, useRef } from 'react';

const CLOSE_SEARCH = 'CLOSE_SEARCH';
const UPDATE_SEARCH = 'UPDATE_SEARCH';
const KEY_MOVE = 'KEY_MOVE';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
const SELECT_GROUP = 'SELECT_GROUP';

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export default function GroupSearch({ setGroup, focusOnTab, groups, placeholderText }) {
  function reducer(state, action) {
    switch (action.type) {
      case SELECT_GROUP:
        return {
          ...state,
          groupsOpen: false,
          focusIndex: null,
          searchText: action.searchText
        }; 
      case CLOSE_SEARCH:
        return {
          ...state,
          groupsOpen: false,
          focusIndex: null,
          drawerGroups: Array.from(groups),
        };
      case UPDATE_SEARCH:
        return {
          ...state,
          groupsOpen: true,
          focusIndex: null,
          ...action.payload
        };
      case KEY_MOVE:
        const { dir, defaultIndex } = action;
        const { focusIndex, drawerGroups } = state;

        const newFocusIndex = (focusIndex === null)
          ? defaultIndex
          : clamp((focusIndex + dir), 0, drawerGroups.length - 1);

        const searchText = drawerGroups[newFocusIndex]?.title;
        return { ...state, focusIndex: newFocusIndex, searchText };

      case TOGGLE_DRAWER:
        return { ...state, groupsOpen: !state.groupsOpen }
      default:
        return new Error("Action type doesn't exist");
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    searchText: '',
    drawerGroups: Array.from(groups),
    groupsOpen: false,
    focusIndex: null,
  });

  const allowUnfocus = useRef(true);
  const searchField = useRef();
  const searchDiv = useRef();
  const groupListItems = useRef([]);

  function textMatchesGroup(text) {
    return group => new RegExp(`^${text}`, 'i').test(group.title);
  }

  function selectGroup(group) {
    dispatch({ type: SELECT_GROUP, searchText: group.title });
  }

  function submitGroup(title) {
    const chosenGroup = groups.find(textMatchesGroup(title));
    selectGroup(chosenGroup);
  }

  function searchHandler(e) {
    const searchText = e.target.value;
    const drawerGroups = groups.filter(textMatchesGroup(searchText));

    dispatch({ 
      type: UPDATE_SEARCH, 
      payload: { searchText, drawerGroups }
    });
  }

  function handleKeyDown(e) {
    if (!state.groupsOpen) return;
  
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        dispatch({ type: KEY_MOVE, dir: 1, defaultIndex: 0 })
        break;
      case 'ArrowUp':
        e.preventDefault();
        dispatch({ type: KEY_MOVE, dir: -1, defaultIndex: null })
        break;
      case 'Tab':
        if (focusOnTab) {
          e.preventDefault();
          focusOnTab.disabled = false;
          focusOnTab.focus();
          dispatch({ type: CLOSE_SEARCH })
        }
        break;
      case 'Escape':
      case 'Enter':
        dispatch({ type: CLOSE_SEARCH });
    }  
  }

  function toggleDrawer() {
    searchDiv.current.focus();
    dispatch({ type: TOGGLE_DRAWER });
  }

  function clearSearch() {
    searchField.current.focus();
    dispatch({ 
      type: UPDATE_SEARCH, 
      payload: { drawerGroups: Array.from(groups), searchText: '' }
    });
  }

  const { focusIndex, groupsOpen, drawerGroups, searchText } = state;

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
  }, [focusIndex, groupListItems]);

  useEffect(() => {
    setGroup(groups.find(group => group.title === searchText)?.title);
  }, [searchText, groups, setGroup])

  useEffect(() => {
    const clickInListener = searchDiv.current.addEventListener('click', e => {
      allowUnfocus.current = false;
    });

    const clickOutListener = document.addEventListener('click', (e) => {
      if (allowUnfocus.current) dispatch({ type: CLOSE_SEARCH })
      allowUnfocus.current = true;
    });

    return () => {
      removeEventListener('click', clickOutListener);
      removeEventListener('click', clickInListener);
    }
  }, []);
  
  return (
    <div 
      className='group-search-container' 
      tabIndex='0' 
      onKeyDown={handleKeyDown}
      ref={searchDiv}
    >
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
          onFocus={searchHandler}
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
            onClick={() => {
              console.log('click handler')
              selectGroup(group)
            }}
            ref={li => groupListItems.current[idx] = li}
          >
            {group.title}
          </li>
        ))}
      </ul>
    </div>
  )

};