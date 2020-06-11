class ApplicationController < ActionController::Base

  helper_method :current_user, :current_participant, :logged_in?

  # before_action :make_keys_snake_case

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def current_participant
    @current_participant ||= ( current_user || anonymous )
  end

  def login!(user)
    cookies.permanent.signed[:session_token] = session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    current_user = cookies.signed[:session_token] = session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def ensure_logged_in
     render json: ['Login required for this request.'], status: 403  unless logged_in?
  end

  def update_and_render(model, params, render_on_success = :show)
    if model.update(params)
      render render_on_success
    else 
      render json: model.errors.full_messages, status: 422
    end
  end

  def snake_params(required = nil)
    if required
      params.require(required).transform_keys(&:underscore)
    else
      params.transform_keys(&:underscore)
    end
  end

  def ensure_current_user(id)
    render_not_authorized unless current_user.id == id.to_i    
    current_user.id == id.to_i
  end

  def render_not_authorized
    render json: ['Not authorized to make this request.'], status: 401
  end

  private

  def anonymous
    anon = UnregisteredParticipant.find_by( participant_session_token: cookies[:participant_session_token] )
    unless anon
      anon = UnregisteredParticipant.create()
      cookies[:participant_session_token] = { 
        value: anon.participant_session_token, 
        expires: 1.year 
      }
    end

    anon
  end

end
