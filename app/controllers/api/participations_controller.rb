class Api::ParticipationsController < ApplicationController
  def recents
    @participations = Participation.recents(params[:type], params[:id])
    render :recents
  end
end