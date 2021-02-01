class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:show]
  
  before_action only: [:update] do
     ensure_current_user(params[:id]) 
  end

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end

  def current
    @user = current_user
    render :show
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])

    update_and_render(@user, user_params)
  end

  def presentation
    @user = User.find_by(username: params[:username])

    @participant = Participant.find_or_create_by(
      participatable_id: params[:id], 
      participatable_type: params[:type], 
      presenter_id: @user.id
    )

    unless @user && @participant
      render json: ['Could not find user'], status: 422
    end

    @participant.touch
  
    if @poll = @user.active_poll
      render :presentation 
    else
      render 'api/participants/show'
    end
  end

  private

  def user_params
    snake_params(:user).permit(:username, :email, :password, :first_name, :last_name)
  end

end