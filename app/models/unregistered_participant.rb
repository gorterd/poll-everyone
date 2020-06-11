class UnregisteredParticipant < ApplicationRecord

  before_validation :ensure_participant_session_token, on: [:create]
  has_many :participants, as: :participatable, dependent: :destroy
  has_many :responses, through: :participants, source: :responses

  private

  def ensure_participant_session_token
    self.participant_session_token ||= SecureRandom.urlsafe_base64(32)
  end
end
