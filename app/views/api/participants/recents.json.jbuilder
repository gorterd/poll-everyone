json.recents @participants.each do |participant|
  json.username participant.presenter.username
end