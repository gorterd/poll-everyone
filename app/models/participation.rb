class Participation < ApplicationRecord
  belongs_to :participant, polymorphic: true
  belongs_to :presenter, class_name: :User
  has_many :responses

  def self.recents(type, id)
    where(
      participant_type: type, 
      participant_id: id
    ).includes(:presenter).order(updated_at: :desc).limit(3)
  end
end
