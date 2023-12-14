class UserRole < ApplicationRecord
  belongs_to :user
  belongs_to :role

  validates :user_id, presence: true
  validates :role_id, presence: true

  self.table_name = 'users_roles'
end