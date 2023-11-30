class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  :verify_authenticity_token

  rolify

  has_many :bookings, dependent: :destroy
  has_many :comments, dependent: :destroy

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  def generate_jwt
    JWT.encode({ id: id, exp: 60.days.from_now.to_i }, Rails.application.credentials.devise_jwt_secret_key!)
  end

  def admin?
    has_role?(:admin)
  end
  
end

