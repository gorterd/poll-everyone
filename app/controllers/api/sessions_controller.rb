class Api::SessionsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy]

  def create
    login_params = snake_params(:user)

    @user = User.find_by_credentials(
      login_params[:username_or_email],
      login_params[:password]
    )

    if @user
      login!(@user)
      @groups = @user.groups.includes(:polls)
      render 'api/users/show'
    else
      render json: ['Incorrect password'], status: 422
    end
  end

  def destroy
    id = current_user.id
    logout!
    render json: { id: id }
  end

  def check_if_user_exists
    if User.username_or_email_exists?(params[:query])
      render json: {}, status: 200
    else
      render json: ['No account with that email or username exists'], status: 404
    end
  end

end