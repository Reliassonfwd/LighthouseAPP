class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  :verify_authenticity_token

  rolify

  has_many :bookings
  has_many :comments

devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

end

