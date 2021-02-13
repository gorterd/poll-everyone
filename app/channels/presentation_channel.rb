class PresentationChannel < ApplicationCable::Channel

  def subscribed
    @presenter = User.find params[:presenterId]
    stream_for @presenter
  end

  def respond(response)
    @answer_option = AnswerOption.find_by id: response['answerOptionId']
    @response = @answer_option.responses
      .build participation_id: response['participationId'] 

    if @response.save
      PresentationChannel.broadcast_to @presenter, 
        type: 'RESPONSE', 
        data: response_json
    end
  end

  def clear(response)
    @response = Response.find_by id: response['id']

    if @response.destroy
      PresentationChannel.broadcast_to @presenter, 
        type: 'CLEAR_RESPONSE', 
        data: response_json
    end
  end

  private
  
  def response_json
    ApplicationController.render(
      :json,
      partial: 'api/responses/response',
      locals: { response: @response }
    )
  end

end