class Group < ApplicationRecord

  validates :title, :ord, presence: true
  
  before_destroy :remove_from_order_and_destroy_polls
  before_create :ensure_ord
  
  belongs_to :user, inverse_of: :groups, counter_cache: true
  has_many :polls, inverse_of: :group

  # logic
  
  def ordered_polls
    self.polls.order(:ord)
  end

  def ordered_poll_ids
    self.ordered_polls.pluck(:id)
  end

  def next_ord
    self.polls.size
  end

  def remove_poll_from_order(poll_id)
    new_order = self.ordered_poll_ids
    new_order.delete(poll_id)
    update_ords(new_order, Poll)
  end

  def insert_poll_at_pos(poll_id, pos)
    return false if pos < 1 || pos > self.next_ord

    new_order = self.ordered_poll_ids
    new_order.delete(poll_id)
    new_order.insert(poll_id, pos)

    self.update_ords(new_order, Poll)
  end

  private
  
  def destroy_or_remove_polls
    if self.user.groups.size == 1 || self.ord == 1 
      self.polls.destroy_all
    else
      self.user.default_group.polls << self.polls
    end

    self.user.remove_group_from_order(self.id)
  end

  def ensure_ord
    self.ord = self.user.next_ord
  end
  
end
  