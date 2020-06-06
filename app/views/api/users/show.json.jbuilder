json.user do
  json.partial! '/api/users/user', user: @user
  json.ordered_group_ids @user.ordered_group_ids
end

json.groups do 
  @user.groups.each do |group|
    json.set! group.id do
      json.partial! 'api/groups/group', group: group
      json.ordered_poll_ids group.ordered_poll_ids
    end
  end
end

json.polls do 
  @user.polls.each do |poll|
    json.set! poll.id do 
      json.partial! 'api/polls/poll', poll: poll
    end
  end
end