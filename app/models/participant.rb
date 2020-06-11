class Participant < ApplicationRecord

  belongs_to :participatable, polymorphic: true
  belongs_to :presenter, class: :User
  has_many :responses

end
