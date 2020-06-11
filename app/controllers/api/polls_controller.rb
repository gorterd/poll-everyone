class Api::PollsController < ApplicationController

  before_action only: [:create] do 
    @group = Group.find_by(id: params[:group_id])
    ensure_current_user(@group.user.id)
  end

  before_action only: [:show, :update, :destroy, :duplicate] do 
    @poll = Poll.find_by(id: params[:id])
    ensure_current_user(@poll.user.id)
  end

  before_action only: [:toggle_activation] do 
    @poll = Poll.includes(answer_options: :responses).find_by(id: params[:id])
    # ensure_current_user(@poll.user.id)
  end

  def show
    render :show
  end

  def create
    @poll = Poll.new(poll_params)
    @poll.group_id = params[:group_id]
    

    if @poll.save
      render :show
    else
      render @poll.errors.full_messages, status: 422
    end
  end
  
  def update
    update_and_render(@poll, poll_params)
  end

  def destroy
    @poll.destroy
    render :show
  end

  def duplicate
    @poll = Poll.dup_with_answer_options(@poll)
    
    if @poll.save
      render :show
    else
      render @poll.errors.full_messages, status: 422
    end
  end

  def toggle_activation
    @poll.active = !@poll.active
    if @poll.save
      PresentationChannel.broadcast_to(@poll.user, {type: 'POLL', data: json_poll_data})
      render json: :nothing, status: 200
    else
      render json: ['Could not activate poll'], status: 422
    end
  end

  private

  def poll_params
    snake_params(:poll)
      .permit( :title, :poll_type, :locked, :allow_changes, :allow_anonymous, :num_responses_allowed,
      answer_options_attributes: [:body, :ord, :correct, :id, :_destroy] )
  end

  def json_poll_data
    ApplicationController.render(
      :json,
      partial: 'api/polls/full_data',
      locals: { poll: @poll }
    )
  end
end