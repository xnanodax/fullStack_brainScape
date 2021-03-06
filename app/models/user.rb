# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  img_url         :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  attr_reader :password

  has_many :own_decks,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Deck

  has_many :own_cards,
    through: :own_decks,
    source: :cards

  has_many :studyscores,
    primary_key: :id,
    foreign_key: :tester_id,
    class_name: :Studyscore,
    dependent: :destroy

  has_many :played_decks,
    through: :studyscores,
    source: :deck

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return user if user && user.is_password?(password)
    nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def five_recently_played_decks
    # self.played_decks
    #   .select(:id, :title, 'MAX("studyscores"."updated_at") as last_updated_card')
    #   .joins(:studyscores)
    #   .group(:id)
    #   .order('MAX("studyscores"."updated_at") DESC')
    #   .limit(5)
  end

  def five_most_popular_decks
    # self.own_decks
    # .select(:id, :title, 'COUNT(DISTINCT studyscores.tester_id) as num_plays')
    # .joins(:studyscores)
    # .group(:id)
    # .order('COUNT(DISTINCT studyscores.tester_id) DESC')
    # .limit(5)
  end

end
