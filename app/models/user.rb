# User
#
# Este modelo representa un usuario en la aplicación. 
# Cada usuario puede tener muchas reservas y comentarios. 
# Si el usuario se destruye, también se destruirán las reservas y los comentarios asociados.
# Además, este modelo incluye funcionalidades para la autenticación y la gestión de roles.

class User < ApplicationRecord
  # Incluye la estrategia de revocación de JWT de Devise.
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Incluye la funcionalidad de Rolify para la gestión de roles.
  rolify

  # Un usuario tiene muchas reservas. Si el usuario se destruye, también se destruirán las reservas asociadas.
  has_many :bookings, dependent: :destroy

  # Un usuario tiene muchos comentarios. Si el usuario se destruye, también se destruirán los comentarios asociados.
  has_many :comments, dependent: :destroy

  # Configura Devise para este modelo. Incluye módulos para la autenticación de base de datos, el registro, la recuperación de contraseñas, el recuerdo de sesiones, la validación y la autenticación JWT.
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  # Genera un JWT para el usuario. El JWT incluye el ID del usuario y una fecha de expiración 60 días en el futuro.
  def generate_jwt
    JWT.encode({ id: id, exp: 60.days.from_now.to_i }, Rails.application.credentials.devise_jwt_secret_key!)
  end

  # Comprueba si el usuario tiene el rol de administrador.
  def admin?
    has_role?(:admin)
  end
end