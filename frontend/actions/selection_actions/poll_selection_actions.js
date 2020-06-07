export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS'; 
export const RECEIVE_GROUP_SELECTION = 'RECEIVE_GROUP_SELECTION'; 
export const CLEAR_GROUP_SELECTION = 'CLEAR_GROUP_SELECTION'; 
export const RECEIVE_POLL_SELECTION = 'RECEIVE_POLL_SELECTION';
export const CLEAR_POLL_SELECTION = 'CLEAR_POLL_SELECTION';

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