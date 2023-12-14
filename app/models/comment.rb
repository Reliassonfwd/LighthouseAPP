class Comment < ApplicationRecord
  # A comment belongs to a user.
  # This means that each comment is associated with a single user.
  belongs_to :user

  # A comment belongs to a tour. If the comment is destroyed, the associated tour will also be destroyed.
  # This implies a dependent relationship where the existence of a tour is reliant on the existence of a comment.
  belongs_to :tour, dependent: :destroy
end
