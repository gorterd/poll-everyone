class Group < ApplicationRecord

  validates :title, presence: true
  
  belongs_to :user, inverse_of: :groups
  has_many :polls
  
  before_destroy :destroy_or_remove_polls
  after_save :add_to_ordered_group_ids, if: :saved_change_to_user_id


  #REMOVE FOR PRODUCTION
  def self.rg
    # debugger
    self.create!(
      title: ("group" + rand(100..999).to_s),
      user_id: User.first.id
    )
  end
  # logic
  
  def remove_poll_id_from_order(poll_id)
    self.ordered_poll_ids.delete(poll_id)
    self.save
  end

  def add_poll_id_to_order(poll_id)
    self.ordered_poll_ids << poll_id
    self.save
  end

  def add_poll_id_at_pos(poll_id, pos)
    return false if pos < 0 || pos > self.ordered_poll_ids.size
    self.ordered_poll_ids.delete(poll_id)
    self.ordered_poll_ids.insert(pos, poll_id)
    self.save!
  end

  def make_default!
    unless self.default?
      self.user.make_default_group(self.id)
    end
  end

  def default?
    self.id == self.user.ordered_group_ids.first
  end

  private

  def add_to_ordered_group_ids
    self.user.update!(ordered_group_ids: self.user.ordered_group_ids.push(self.id))
  end

  
  def destroy_or_remove_polls
    if self.user.ordered_group_ids.length == 1
      self.polls.destroy_all
    elsif self.default? 
      incumbent_default = self.user.ordered_group_ids[1]
      incumbent_default << self.polls
    else
      self.user.default_group.polls << self.polls
    end

    self.user.remove_group_id_from_order(self.id)
  end
  
end
  