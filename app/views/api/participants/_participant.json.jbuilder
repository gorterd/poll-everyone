json.key_format! camelize: :lower

json.participant do
  json.extract! participant, :id, :presenter_id, :screen_name, :participatable_type, :participatable_id
end