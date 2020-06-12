class Participant < ApplicationRecord

  belongs_to :participatable, polymorphic: true
  belongs_to :presenter, class_name: :User
  has_many :responses

  def self.recents(type, id)
    Participant.where(
      participatable_type: type, 
      participatable_id: id
    ).includes(:presenter).order(updated_at: :desc).limit(3)
  end
end
