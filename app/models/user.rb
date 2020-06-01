class User < ApplicationRecord

  attr_reader :password

  validates :username, :email, :password_digest, :session_token, presence: true, uniqueness: true
  validates :password, length: {minimum: 7}, allow_nil: true

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)    
    !user.nil? && user.is_password?(password) ? user : nil 
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(32)
  end

  def reset_session_token!
    self.update! session_token: self.class.generate_session_token
    self.session_token
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private
  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end

