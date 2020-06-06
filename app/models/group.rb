class Group < ApplicationRecord

  validates :title, presence: true
  
  belongs_to :user, inverse_of: :groups
  has_many :polls
  
  before_destroy :destroy_or_remove_polls

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
  end

  def add_poll_id_to_order(poll_id)
    self.ordered_poll_ids << poll_id
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
  