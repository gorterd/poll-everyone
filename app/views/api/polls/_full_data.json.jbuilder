json.poll do
  json.partial! 'api/polls/poll', poll: poll
end

json.answer_options do
  poll.answer_options.each do |answer_option|
    json.set! answer_option.id do
      json.partial! 'api/answer_options/answer_option', answer_option: answer_option
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

