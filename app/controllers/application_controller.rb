class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  # before_action :make_keys_snake_case

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    current_user = session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def ensure_logged_in
     render json: ['Login required for this request.'], status: 403  unless logged_in?
  end

  def snake_params(required = nil)
    if required
      params.require(required).transform_keys(&:underscore)
    else
      params.transform_keys(&:underscore)
    end
  end

end
