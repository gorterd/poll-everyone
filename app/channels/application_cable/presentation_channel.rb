class PresentationChannel < ApplicationCable::Channel

  def subscribed
    presenter = User.find(params[:presenterId])
    stream_for presenter
  end

  def answer(response)

  end

end