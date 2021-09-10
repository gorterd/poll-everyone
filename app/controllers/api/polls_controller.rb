class Api::PollsController < ApplicationController

  before_action only: [:create] do 
    @group = Group.find_by(id: params[:group_id])
    ensure_current_user(@group.user.id)
  end

  before_action only: [:destroy, :duplicate] do 
    @poll = Poll.find_by(id: params[:id])
    ensure_current_user(@poll.user.id)
  end

  before_action only: [:update, :toggle_activation] do 
    @poll = Poll.includes(answer_options: :responses).find_by(id: params[:id])
    ensure_current_user(@poll.user.id)
  end

  def show
    if snake_params[:full_data]
      @poll = Poll.includes(answer_options: :responses).find_by(id: params[:id])
      ensure_current_user(@poll.user.id)
      render partial: 'api/polls/full_data.json.jbuilder', locals: { poll: @poll }
    else
      @poll = Poll.find_by(id: params[:id])
      ensure_current_user(@poll.user.id)
      render :show
    end
  end

  def create
    @poll = Poll.new(poll_params)
    @poll.group_id = params[:group_id]
    
    if @poll.save
      render :show
    else
      render json: @poll.errors.full_messages, status: 422
    end
  end
  
  def update
    if @poll.update_and_replace_options(poll_params)
      broadcast_poll
      render :show
    else 
      render json: @poll.errors.full_messages, status: 422
    end
  end

  def destroy
    @poll.destroy
    render :show
  end

  def duplicate
    @poll = @poll.dup_with_answer_options
    
    if @poll.save
      render :show
    else
      render @poll.errors.full_messages, status: 422
    end
  end

  def toggle_activation
    touched_polls = @poll.toggle_active
    broadcast_poll
    render json: touched_polls
  end

  private

  def poll_params
    snake_params(:poll).permit( 
        :title, 
        :poll_type, 
        :locked, 
        :allow_changes, 
        :allow_anonymous, 
        :num_responses_allowed,
        answer_options_attributes: [:body, :ord, :correct, :id] 
    )
  end

  def broadcast_poll
    PresentationChannel.broadcast_to @poll.user, 
      type: 'POLL', 
      data: json_poll_data
  end

  def json_poll_data
    ApplicationController.render(
      :json,
      partial: 'api/polls/full_data',
      locals: { poll: @poll }
    )
  end
end

