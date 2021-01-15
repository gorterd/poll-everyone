export const RECEIVE_GROUP_SELECTION = 'RECEIVE_GROUP_SELECTION'; 
export const CLEAR_GROUP_SELECTION = 'CLEAR_GROUP_SELECTION'; 
export const RECEIVE_POLL_SELECTION = 'RECEIVE_POLL_SELECTION';
export const CLEAR_POLL_SELECTION = 'CLEAR_POLL_SELECTION';
export const RECEIVE_SELECTIONS = 'RECEVE_SELECTIONS'; 
export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS'; 

export const receiveSelections = selections => {
  return {
    type: RECEIVE_SELECTIONS,
    data: selections
  }
}

export const clearSelections = () => {
  return {
    type: CLEAR_SELECTIONS
  }
}

export const receiveGroupSelection = group => {
  const groupId = group.id;
  const pollIds = group.pollIds;
  return {
    type: RECEIVE_GROUP_SELECTION,
    data: { groupId, pollIds }
  }
}

export const clearGroupSelection = group => {
  const groupId = group.id;
  const pollIds = group.pollIds;
  return {
    type: CLEAR_GROUP_SELECTION,
    data: { groupId, pollIds }
  }
}

// expects group and pollId
export const receivePollSelection = data => {
  return {
    type: RECEIVE_POLL_SELECTION,
    data,
  }
}

// expects group and pollId
export const clearPollSelection = data => {
  return {
    type: CLEAR_POLL_SELECTION,
    data
  }
}
