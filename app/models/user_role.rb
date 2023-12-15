# UserRole
#
# ActiveRecord model representing the association between users and roles.
# It serves as a join model for the many-to-many relationship between users and roles.

class UserRole < ApplicationRecord
  # Associations:
  # - Belongs to a user.
  # - Belongs to a role.
  belongs_to :user
  belongs_to :role

  # Validations:
  # - Ensures the presence of user_id and role_id.
  validates :user_id, presence: true
  validates :role_id, presence: true

  # Table Name:
  # - Specifies the custom table name for the model, 'users_roles'.
  self.table_name = 'users_roles'
end
