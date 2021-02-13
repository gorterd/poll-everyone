json.array! @participations.each do |participation|
  json.username participation.presenter.username
  json.id participation.id
end