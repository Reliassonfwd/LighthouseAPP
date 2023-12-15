class Comment < ApplicationRecord
  # A comment belongs to a user.
  # This means that each comment is associated with a single user.
  belongs_to :user

  # A comment belongs to a tour.
  # This means that each comment is associated with a single tour.
  # The 'dependent: :destroy' option means that when a comment is destroyed, 
  # its associated tour will NOT be destroyed. This is a one-way association.
  belongs_to :tour, dependent: :destroy

  # Validates the presence of the 'comment_text' field.
  # This means that the 'comment_text' field must be present before the comment can be saved.
  # If 'comment_text' is not present, the comment will not be valid and will not be saved.
  validates :comment_text, presence: true

  # Validates the presence of the 'rating' field.
  # This means that the 'rating' field must be present before the comment can be saved.
  # If 'rating' is not present, the comment will not be valid and will not be saved.
  validates :rating, presence: true
end
