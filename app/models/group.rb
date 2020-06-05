class Group < ApplicationRecord

  validates :title, presence: true

  before_validation :prevent_repeat_default
  
  belongs_to :user, inverse_of: :groups
  has_many :polls
  
  after_destroy :destroy_or_remove_polls
  
  def make_default!
    unless self.default
      self.user.default_group.update!(default: false)
      self.update!(default: true)
    end
  end
  
  def siblings
    self.user.groups.where('id != ? ', self.id)
  end

  def ordered_poll_ids
    self.polls.order(:ord, :created_at).pluck(:id)
  end

  def last_poll_ord
    self.polls.order(ord: :desc).limit(1).pluck(:ord).first
  end

  private
  
  def prevent_repeat_default
    if self.default && self.class.where(user_id: self.user.id).find_by(default: true)
      self.default = false
    end
  end
  
  def destroy_or_remove_polls
    siblings = self.siblings 
    if siblings.count == 0
      self.polls.destroy_all
    elsif self.default 
      siblings.first.polls << self.polls
      siblings.first.update!(default: true)
    else
      self.user.default_group.polls << self.polls
    end
  end
  
end
  