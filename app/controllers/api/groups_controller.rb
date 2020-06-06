class Api::AnswerOptionsController < ApplicationController

  before_action only: [:index] do 
    ensure_current_user(params[:user_id])
  end

  def index
    @user = User.find_by(id: params[:user_id])

    @groups = User.groups.includes(:polls)
    render :index
  end

  def show

  end

  def create

  end
  
  def destroy
    @group = Group.find_by(params[:id])
  end
  
  def update
    @group = Group.find_by(params[:id])
    return unless ensure_current_user(@group.user_id)

    update_and_render(@group, group_params)
  end

  private

  def group_params
    snake_params(:group).permit(:title, :user_id)
  end

end