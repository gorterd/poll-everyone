json.poll do 
  json.partial! 'api/polls/poll', poll: @poll
  json.answerOptionIds @poll.answer_option_ids
end

json.answerOptions do
  @poll.answer_options.each do |answer_option|
    json.set! answer_option.id do
      json.partial! 'api/answer_options/answer_option', answer_option: answer_option
    end
  end
end



