class ApplicationController < ActionController::Base

  helper_methods :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session_token[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    current_user = session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def ensure_logged_in
     render json: ['Not authorized to make this request.'], status: 401  unless logged_in?
  end

end
