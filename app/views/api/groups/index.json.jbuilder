@groups.each do |group|
  json.groups do
    json.set! group.id do
      json.partial! 'api/groups/group', group: group
      json.ordered_poll_ids group.ordered_poll_ids
    end
  end

  json.polls group.polls.each do |poll|
    json.set! poll.id do
      json.partial! 'api/polls/poll', poll: poll
    end
  end
end

