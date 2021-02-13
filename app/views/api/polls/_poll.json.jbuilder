json.extract! poll, 
  :id, 
  :title, 
  :poll_type, 
  :ord, 
  :active, 
  :num_responses_allowed, 
  :group_id,
  :answer_option_ids

json.num_responses poll.responses.size