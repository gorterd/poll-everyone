class Api::ParticipantsController < ApplicationController

  def recents
    @participants = Participant.recents(params[:type], params[:id])
    render :recents
  end
end