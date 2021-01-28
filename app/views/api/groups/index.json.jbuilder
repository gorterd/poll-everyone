json.groups do 
  @groups.each do |group|
    json.set! group.id do
      json.partial! 'api/groups/group', group: group

      json.pollIds group.poll_ids
    end
  end
end

json.polls do
  @groups.each do |group|
    group.polls.each do |poll|
      json.set! poll.id do 
        json.partial! 'api/polls/poll', poll: poll
      end
    end
  end
end
