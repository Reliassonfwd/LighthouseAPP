class User < ApplicationRecord
  # Includes the JWT revocation strategy of Devise.
  # This strategy ensures that a user's session can be securely managed using JSON Web Tokens.
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Includes the functionality of Rolify for role management.
  # This allows the application to assign different roles to users, enhancing the security and functionality of the application.
  rolify

  # A user has many bookings. If the user is destroyed, the associated bookings will also be destroyed.
  # This means that all bookings related to a specific user will be removed from the database when that user is deleted.
  has_many :bookings, dependent: :destroy

  # A user has many comments. If the user is destroyed, the associated comments will also be destroyed.
  # This ensures that when a user is deleted, all of its associated comments are also deleted.
  has_many :comments, dependent: :destroy

  # Configures Devise for this model. Includes modules for database authentication, registration, password recovery, session remembering, validation, and JWT authentication.
  # This provides a comprehensive set of authentication and user management features for the application.
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  # Generates a JWT for the user. The JWT includes the user's ID and an expiration date 60 days in the future.
  # This method is used to create a secure token that can be used for user authentication in a stateless, secure manner.
  def generate_jwt
    JWT.encode({ id: id, exp: 60.days.from_now.to_i }, Rails.application.credentials.devise_jwt_secret_key!)
  end

  # Checks if the user has the role of administrator.
  # This method provides a convenient way to check if a user has administrative privileges in the application.
  def admin?
    has_role?(:admin)
  end
end
