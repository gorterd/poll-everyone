export const createPoll = (poll, groupId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/groups/${groupId}/polls`,
    data: { poll }
  });
}

export const fetchPoll = (pollId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/polls/${pollId}`
  });
}

export const fetchFullPoll = (pollId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/polls/${pollId}`,
    data: { fullData: true }
  });
}

export const updatePoll = (poll, pollId) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/polls/${pollId}`,
    data: { poll }
  });
}

export const duplicatePoll = pollId => {
  return $.ajax({
    method: 'POST',
    url: `/api/polls/${pollId}/duplicate`,
    data: { pollId }
  });
}

export const toggleActive = pollId =>  {
  return $.ajax({
    method: 'PATCH',
    url: `/api/polls/${pollId}/toggle_activation`,
  }); 
}

window.toggleActive = toggleActive;