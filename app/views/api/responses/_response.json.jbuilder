json.key_format! camelize: :lower
json.extract! response, :id, :answer_option_id, :poll_id, :body, :created_at
json.author_id response.author.id
json.author_type response.participant.participatable_type