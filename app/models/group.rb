class Group < ApplicationRecord
  include Orderable
  set_ord_container :user

  validates :title, :ord, presence: true
  
  before_validation :ensure_ord, :ensure_title, on: :create
  after_destroy :remove_from_container_order
  
  belongs_to :user
  has_many :polls, -> { order(:ord) }, dependent: :destroy

  def save_with_polls(poll_ids)
    self.class.transaction do 
      save!
      Poll.move_items(poll_ids, id)
    end
    rescue
  end

  private

  def ensure_title
    self.title ||= 'New group'
  end
end
  