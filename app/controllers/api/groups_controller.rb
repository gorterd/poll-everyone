class Api::GroupsController < ApplicationController

  before_action only: [:index, :create] do 
    ensure_current_user(params[:user_id])
  end

  before_action only: [:update, :destroy, :move_polls] do 
    @group = Group.find_by(id: params[:id])
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
    poll_ids = snake_params[:poll_ids]

    if poll_ids && Group.save_with_polls(@group, poll_ids.map(&:to_i))
      @groups = @group.user.groups.includes(:polls)
      render :index
    elsif !poll_ids && @group.save
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end
  
  def update
    update_and_render(@group, group_params)
  end

  def destroy
    @group.destroy

    @groups = @group.user.groups.includes(:polls)
    render :index
  end

  def batch_destroy
    group_ids = snake_params[:group_ids] ? snake_params[:group_ids].map(&:to_i) : []
    poll_ids = snake_params[:poll_ids] ? snake_params[:poll_ids].map(&:to_i) : []
    
    @groups_to_destroy = Group.where(id: group_ids).where('ord != 0')
    @polls_to_destroy = Poll.where(id: poll_ids)

    is_owner_of_groups = @groups_to_destroy.pluck(:user_id).all? { |id| id == current_user.id }
    is_owner_of_polls = @polls_to_destroy.all? { |poll| poll.user.id == current_user.id }
    
    if is_owner_of_groups && is_owner_of_polls
      @polls_to_destroy.destroy_all
      @groups_to_destroy.destroy_all
      @groups = current_user.groups.includes(:polls)
      render :index
    else
      render_not_authorized 
    end 
  end

  def move_polls
    poll_ids = snake_params[:poll_ids].map(&:to_i)

    if Poll.move_polls(poll_ids, @group.id)
      @groups = current_user.groups.includes(:polls)
      render :index
    else
      render json: ['Could not move polls'], status: 422
    end
  end

  private

  def group_params
    snake_params(:group).permit(:title)
  end

end