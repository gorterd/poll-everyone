class UnregisteredParticipant < ApplicationRecord
  before_validation :ensure_participant_session_token, on: :create
  has_many :participations, as: :participant, dependent: :destroy # TODO refactor for delete_all
  has_many :responses, through: :participations, source: :responses

  private

  def ensure_participant_session_token
    self.participant_session_token ||= SecureRandom.urlsafe_base64(32)
  end
end
