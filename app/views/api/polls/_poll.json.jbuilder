json.key_format! camelize: :lower
json.extract! poll, :id, :title, :poll_type, :ord, :active, :num_responses_allowed, :group_id
json.num_responses poll.responses.size