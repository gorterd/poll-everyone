json.key_format! camelize: :lower

json.poll do
  json.partial! 'api/polls/poll', poll: poll
  json.answerOptionIds poll.answer_option_ids
end

json.answer_options do
  poll.answer_options.each do |answer_option|
    json.set! answer_option.id do
      json.partial! 'api/answer_options/answer_option', answer_option: answer_option
      json.responseIds answer_option.response_ids
    end
  end
end

json.responses do
  poll.responses.each do |response|
    json.set! response.id do
      json.partial! 'api/responses/response', response: response
    end
  end
end

