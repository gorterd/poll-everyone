class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true, 
    format: { with: /\A[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-z]{2,}\z/ }
  validates :first_name, :last_name, presence: true
  validates :password, length: { minimum: 7 }, allow_nil: true
  
  before_validation :ensure_session_token, :ensure_username, on: :create
  after_create :generate_default_group
  
  has_many :groups, -> { order(:ord) }, autosave: true, dependent: :destroy
  has_many :polls, -> { order(:ord) }, through: :groups
  has_many :participations, as: :participant, dependent: :destroy
  has_many :responses, through: :participations, source: :responses
  
  attr_reader :password

  # class methods

  def self.username_or_email_exists?(username_or_email)
    exists?(['username = :ue OR email = :ue', ue: username_or_email])
  end

  def self.find_by_credentials(username_or_email, password)
    user = find_by('username = :ue OR email = :ue', ue: username_or_email)
    user && user.is_password?(password) ? user : nil 
  end

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64(32)
    exists?(session_token: token) ? generate_session_token : token
  end

  def self.generate_username(first, last)
    stem = (first + last).downcase
    suffix = rand(100..999)
    stem += 1 while exists? username: stem + suffix.to_s

    stem + suffix.to_s
  end

  # logic

  def default_group
    @default_group ||= groups.find_by ord: 1
  end

  def active_poll
    polls.find_by active: true
  end

  # auth methods

  def reset_session_token!
    self.update! session_token: self.class.generate_session_token
    session_token
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end
  
  private

  # validations and hooks
  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def ensure_username
    self.username ||= self.class.generate_username(first_name, last_name)
  end

  def generate_default_group
    @default_group ||= groups.create title: "Default", ord: 1
  end
end

