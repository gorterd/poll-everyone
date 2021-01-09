import React, { useEffect, useReducer, useRef } from 'react';
import { useDropdown } from '../../util/custom_hooks';
import { clamp } from '../../util/general_util';

const CLOSE_SEARCH = 'CLOSE_SEARCH';
const UPDATE_SEARCH = 'UPDATE_SEARCH';
const KEY_MOVE = 'KEY_MOVE';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
const SELECT_GROUP = 'SELECT_GROUP';

export default function GroupSearch({ setGroup, focusOnTab, groups, placeholderText }) {
  function reducer(state, action) {
    switch (action.type) {
      case SELECT_GROUP:
        return {
          ...state,
          searchText: action.searchText,
          drawerOpen: false,
          focusIndex: null,
        }; 
      case CLOSE_SEARCH:
        return {
          ...state,
          drawerGroups: Array.from(groups),
          drawerOpen: false,
          focusIndex: null,
        };
      case UPDATE_SEARCH:
        return {
          ...state,
          drawerOpen: true,
          focusIndex: null,
          ...action.payload,
        };
      case KEY_MOVE:
        const { dir, defaultIndex } = action;
        const { focusIndex, drawerGroups } = state;

        const newFocusIndex = (focusIndex === null)
          ? defaultIndex
          : clamp((focusIndex + dir), 0, drawerGroups.length - 1);

        const searchText = drawerGroups[newFocusIndex]?.title || '';
        return { ...state, focusIndex: newFocusIndex, searchText };
      case TOGGLE_DRAWER:
        return { ...state, drawerOpen: !state.drawerOpen }
      default:
        return new Error("Action type doesn't exist");
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    searchText: '',
    drawerGroups: Array.from(groups),
    drawerOpen: false,
    focusIndex: null,
  });

  const searchInput = useRef();
  const searchDiv = useRef();
  const drawerLis = useRef([]);

  useEffect(() => {
    const listItem = drawerLis.current[state.focusIndex];
    if (!listItem) return;

    const list = listItem.parentElement;
    list.scrollIntoView(true);

    const itemTop = listItem.offsetTop;
    const itemBottom = itemTop + listItem.offsetHeight;

    if (list.scrollTop > itemTop) {
      list.scrollTop = itemTop;
    } else if (itemBottom > (list.scrollTop + list.clientHeight)) {
      list.scrollTop = itemBottom - list.clientHeight;
    }
  }, [state.focusIndex, drawerLis, searchDiv]);

  useEffect(() => {
    if (searchDiv.current.getBoundingClientRect().top < 0) {
      searchDiv.current.scrollIntoView(false);
    } 
  }, [state.searchText, searchDiv]);

  useEffect(() => {
    setGroup(groups.find(group => group.title === state.searchText));
  }, [state.searchText, groups, setGroup])

  useDropdown(searchDiv, () => dispatch({ type: CLOSE_SEARCH }));

  function textMatchesGroup(text) {
    return group => new RegExp(`^${text}`, 'i').test(group.title);
  }

  function selectGroup(group) {
    dispatch({ type: SELECT_GROUP, searchText: group.title });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const chosenGroup = groups.find(textMatchesGroup(searchText));
    selectGroup(chosenGroup);
  }

  function toggleDrawer() {
    searchDiv.current.focus();
    dispatch({ type: TOGGLE_DRAWER });
  }

  function clearSearch() {
    searchInput.current.focus();
    dispatch({
      type: UPDATE_SEARCH,
      payload: { drawerGroups: Array.from(groups), searchText: '' }
    });
  }

  function handleSearch(e) {
    const searchText = e.target.value;
    const drawerGroups = groups.filter(textMatchesGroup(searchText));

    dispatch({
      type: UPDATE_SEARCH,
      payload: { searchText, drawerGroups }
    });
  }

  function handleKeyDown(e) {
    if (!state.drawerOpen) return;
  
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        return dispatch({ type: KEY_MOVE, dir: 1, defaultIndex: 0 });
      case 'ArrowUp':
        e.preventDefault();
        return dispatch({ type: KEY_MOVE, dir: -1, defaultIndex: null });
      case 'Tab':
        if (focusOnTab) {
          e.preventDefault();
          focusOnTab.disabled = false;
          focusOnTab.focus();
          dispatch({ type: CLOSE_SEARCH });
        }
        break;
      case 'Escape':
      case 'Enter':
        dispatch({ type: CLOSE_SEARCH });
    }  
  }

  const { focusIndex, drawerOpen, drawerGroups, searchText } = state;
  
  return (
    <div 
      className='group-search-container' 
      tabIndex='0' 
      onKeyDown={handleKeyDown}
      ref={searchDiv}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className='group-search-input'
          tabIndex='1'
          placeholder={placeholderText}
          value={searchText}
          onChange={handleSearch}
          onFocus={handleSearch}
          ref={searchInput}
        />
        <span className='clear-group-search' onClick={clearSearch}>
          <i className="fas fa-times"></i>
        </span>
      </form>

      <button className='button-grey' onClick={toggleDrawer}>
        <i className={`fas fa-chevron-${drawerOpen ? 'up' : 'down'}`}></i>
      </button>

      {drawerOpen && <ul className='group-search-list'>
        {drawerGroups.map((group, idx) => (
          <li 
            key={group.id}
            className={focusIndex === idx ? 'focused' : ''}
            onClick={() => selectGroup(group)}
            ref={li => drawerLis.current[idx] = li}
          >
            {group.title}
          </li>
        ))}
      </ul>}
    </div>
  )
};