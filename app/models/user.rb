class User < ApplicationRecord
  
  EMAIL_REGEX = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-z]{2,}$/
  USERNAME_REGEX = /^[a-zA-Z0-9]+$/

  validates :username, :email, :password_digest, :session_token, presence: true, uniqueness: true
  validates :first_name, :last_name, presence: true
  validates :username, length: {minimum: 4}
  validates :password, length: {minimum: 7}, allow_nil: true
  validate :valid_email_syntax, :valid_username_syntax
  
  after_initialize :ensure_session_token, :ensure_username

  attr_reader :password
  
  belongs_to :activatable, polymorphic: true, optional: true

  def self.username_or_email_exists?(username_or_email)
    User.exists?(username: username_or_email) || User.exists?(email: username_or_email)
  end

  def self.find_by_credentials(username_or_email, password)
    if EMAIL_REGEX =~ username_or_email 
      user = User.find_by(email: username_or_email)    
    else
      user = User.find_by(username: username_or_email)
    end

    !user.nil? && user.is_password?(password) ? user : nil 
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(32)
  end

  def self.generate_username(first, last)
    stem = (first + last).downcase
    username = stem + rand(100..999).to_s
    while self.exists?(username: username) do
      username = stem + rand(100..999).to_s
    end

    username
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

  def ensure_username
    self.username ||= self.class.generate_username(self.first_name, self.last_name)
  end

  private

  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end


  def valid_email_syntax
    unless EMAIL_REGEX =~ self.email
      self.errors[:email] << 'address invalid'
    end
  end
  
  def valid_username_syntax
    unless USERNAME_REGEX =~ self.username
      self.errors[:username] << 'can only contain letters or numbers'
    end
  end

end

