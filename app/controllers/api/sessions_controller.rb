class Api::SessionsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:user][:username_or_email],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render :show
    else
      render json: ['Incorrect password'], status: 422
    end
  end

  def destroy
    id = current_user.id
    logout!
    render json: { id: id }
  end

  def username_or_email_exists
    if User.username_or_email_exists(params[:user][:username_or_email])
      render status: 200
    else
      render json: ['No account with that email or username exists'], status: 422
    end
  end

end