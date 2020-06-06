class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:show]
  
  before_action only: [:update] do
     ensure_current_user(params[:id]) 
  end

  def show
    @user = User.find_by(id: params[:id])
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

  private

  def user_params
    snake_params(:user).permit(:username, :email, :password, :first_name, :last_name)
  end

end