json.participant do
  json.key_format! camelize: :lower
  json.extract! participant, :id, :presenter_id, :screen_name, :participatable_type, :participatable_id
end