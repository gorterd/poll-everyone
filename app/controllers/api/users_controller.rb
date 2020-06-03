class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:show]
  before_action :ensure_current_user, only: [:update]

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

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    snake_params(:user).permit(:username, :email, :password, :first_name, :last_name)
  end

  def ensure_current_user
    unless current_user.id == params[:id]
      render json: ['Not authorized to make this request.'], status: 401
    end
  end

end