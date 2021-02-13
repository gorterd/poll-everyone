json.participation do
  json.extract! participation, 
    :id, 
    :presenter_id, 
    :screen_name, 
    :participant_type, 
    :participant_id
end