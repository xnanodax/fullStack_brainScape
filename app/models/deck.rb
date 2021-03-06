# == Schema Information
#
# Table name: decks
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Deck < ApplicationRecord
  validates :author_id, presence: true
  validates :title, length: { allow_blank: false, message: "cannot be blank" }

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  has_many :cards,
    primary_key: :id,
    foreign_key: :deck_id,
    class_name: :Card,
    dependent: :destroy,
    inverse_of: :deck

  has_many :taggings,
    primary_key: :id,
    foreign_key: :deck_id,
    class_name: :Tagging,
    dependent: :destroy

  has_many :tags,
    through: :taggings,
    source: :tag

  has_many :studyscores,
    through: :cards,
    source: :studyscores

  def self.fetch_user_score(deck_id, current_user_id)
    # Deck.find_by(id: deck_id)
    #     .studyscores
    #     .where(tester_id: current_user_id)
    Deck.find_by(id: deck_id).studyscores.where(tester_id: current_user_id)
  end

  def self.fetch_taggings(id)
    Deck.find_by(id: id).taggings
  end

  def self.top_five_results(query_params)
    param = '%' + query_params.downcase + '%' #i can use sql query like
    if query_params != ""
      @decks = Deck.where('lower(title) LIKE ? ', param).limit(5).to_a
      @decks.select { |deck| deck.cards.size > 0 }
    end
  end

  def mastery_score(user_id)
    card_count = self.cards.size
    if card_count > 0
      sum = 0
      Deck.fetch_user_score(self.id, user_id).each do |study_score|
        sum += study_score.learning_score
      end
      total_score = (card_count * 5)
      sum * 100 / total_score
    else
      0
    end
  end

end
