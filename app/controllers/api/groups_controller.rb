class Api::GroupsController < ApplicationController

  before_action only: [:index, :create] do 
    ensure_current_user(params[:user_id])
  end

  before_action only: [:update, :destroy] do 
    @group = Group.find_by(params[:id])
    ensure_current_user(@group.user_id)
  end

  def index
    @user = User.find_by(id: params[:user_id])

    @groups = @user.groups.includes(:polls)
    render :index
  end

  def create
    @group = Group.new(group_params)
    @group.user_id = params[:user_id]
    poll_ids = group_params[:poll_ids]
    
    if poll_ids && @group.save_with_polls(poll_ids)
      @groups = @group.user.groups.includes(:polls)
      render :index
    elsif !poll_ids && @group.save
      render :show
    else
      head status: 422
    end
  end
  
  def update
    update_and_render(@group, group_params, 'api/groups/group')
  end

  def destroy
    @group.destroy

    @groups = @group.user.groups.includes(:polls)
    render :index
  end

  private

  def group_params
    snake_params(:group).permit(:title, :poll_ids)
  end

end