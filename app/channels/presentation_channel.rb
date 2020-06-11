class PresentationChannel < ApplicationCable::Channel

  def subscribed
    @presenter = User.find(params[:presenterId])
    stream_for @presenter
  end

  def respond(response)

  end

  def clear

  end

  def text(msg)
    PresentationChannel.broadcast_to(@presenter, type: 'WORD', text: msg["message"])
  end

end