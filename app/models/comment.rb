class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :tour, dependent: :destroy
end
