class Group < ApplicationRecord

  validates :title, :ord, presence: true
  
  after_destroy :remove_from_order
  before_validation :ensure_ord, :ensure_title, on: [:create]
  
  belongs_to :user, inverse_of: :groups, counter_cache: true
  has_many :polls, inverse_of: :group, dependent: :destroy

  # class methods

  def self.save_with_polls(group, poll_ids)
    
    Group.transaction do 
      group.save!
      Poll.move_polls(poll_ids, group.id)
    end

    true
    rescue
      false
  end
    
  # logic

  def move_group(pos)
      self.user.insert_group_at_pos(self.id, pos)
    end
  
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

  def remove_from_order
    self.user.remove_group_from_order(self.id) unless self.destroyed_by_association
  end

  def ensure_ord
    # debugger
    self.ord ||= self.user.next_ord
    # debugger
  end

  def ensure_title
    self.title = 'New group' if self.title.empty?
  end
end
  