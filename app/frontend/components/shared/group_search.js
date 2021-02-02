import React, { useEffect, useReducer, useRef } from 'react'
import { useDropdown } from '../../hooks/ui'
import { clamp } from '../../util/general_util'

const CLOSE_SEARCH = 'CLOSE_SEARCH'
const UPDATE_SEARCH = 'UPDATE_SEARCH'
const KEY_MOVE = 'KEY_MOVE'
const SET_DRAWER_GROUPS = 'SET_DRAWER_GROUPS'
const SELECT_GROUP = 'SELECT_GROUP'

export default function GroupSearch({ setGroup, focusOnTab, groups, placeholderText, defaultGroup }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SELECT_GROUP:
        return {
          ...state,
          searchText: action.searchText,
          focusIndex: null,
        }
      case CLOSE_SEARCH:
        return {
          ...state,
          drawerGroups: Array.from(groups),
          focusIndex: null,
        }
      case UPDATE_SEARCH:
        return {
          ...state,
          focusIndex: null,
          ...action.payload,
        }
      case KEY_MOVE: {
        const { dir, defaultIndex } = action
        const { focusIndex, drawerGroups } = state

        const newFocusIndex = (focusIndex === null)
          ? defaultIndex
          : clamp((focusIndex + dir), 0, drawerGroups.length - 1)

        const searchText = drawerGroups[newFocusIndex]?.title || ''
        return { ...state, focusIndex: newFocusIndex, searchText }
      }
      case SET_DRAWER_GROUPS:
        return { ...state, drawerGroups: action.groups }
      default:
        return new Error('Action type doesn\'t exist')
    }
  }, {
    searchText: defaultGroup || '',
    drawerGroups: [],
    focusIndex: null,
  })

  const { searchText, drawerGroups, focusIndex } = state
  const searchInput = useRef()
  const drawerLis = useRef([])

  const [
    dropdownShowing,
    searchDiv,
    {
      toggleDropdown, 
      showDropdown, 
      hideDropdown 
    }
  ] = useDropdown() 

  const textMatchesGroup = text => group => 
    new RegExp(`^${text}`, 'i').test(group.title)

  const selectGroup = group => {
    hideDropdown() 
    dispatch({ type: SELECT_GROUP, searchText: group.title })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (focusIndex !== null) return
    const chosenGroup = groups.find(textMatchesGroup(searchText))
    selectGroup(chosenGroup)
  }

  const clearSearch = () => {
    searchInput.current.focus()
    showDropdown() 
    dispatch({
      type: UPDATE_SEARCH,
      payload: { drawerGroups: Array.from(groups), searchText: '' }
    })
  }

  const handleSearch = e => {
    const searchText = e.target.value
    const drawerGroups = groups.filter(textMatchesGroup(searchText))
    showDropdown() 
    dispatch({
      type: UPDATE_SEARCH,
      payload: { searchText, drawerGroups }
    })
  }

  const handleKeyDown = e => {
    if (!dropdownShowing) return 
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        return dispatch({ type: KEY_MOVE, dir: 1, defaultIndex: 0 })
      case 'ArrowUp':
        e.preventDefault()
        return dispatch({ type: KEY_MOVE, dir: -1, defaultIndex: null })
      case 'Tab':
        if (focusOnTab) {
          e.preventDefault()
          focusOnTab.disabled = false
          focusOnTab.focus()
        }
      // fallthrough
      case 'Escape':
      case 'Enter':
        e.stopPropagation()
        hideDropdown() 
        dispatch({ type: CLOSE_SEARCH })
    }  
  }

  useEffect(() => dispatch({
    type: SET_DRAWER_GROUPS,
    groups
  }), [groups])

  useEffect(() => {
    const listItem = drawerLis.current[focusIndex]
    if (!listItem) return

    const itemTop = listItem.offsetTop
    const itemBottom = itemTop + listItem.offsetHeight
    const list = listItem.parentElement

    if (list.scrollTop > itemTop) {
      list.scrollTop = itemTop
    } else if (itemBottom > (list.scrollTop + list.clientHeight)) {
      list.scrollTop = itemBottom - list.clientHeight
    }
  }, [focusIndex, drawerLis, searchDiv])

  useEffect(() => {
    setGroup(groups.find(group => group.title === searchText))
  }, [searchText, groups, setGroup])
  
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

      <button 
        className='button-grey' 
        onClick={toggleDropdown}
      >
        <i className={`fas fa-chevron-${dropdownShowing ? 'up' : 'down'}`}></i>
      </button>

      {dropdownShowing && <ul className='group-search-list'>
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
}