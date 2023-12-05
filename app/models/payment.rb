# PaymentMethod
#
# Este modelo representa un método de pago en la aplicación. 
# Cada método de pago puede tener muchas reservas. Si el método de pago se destruye, también se destruirán las reservas asociadas.

class Payment < ApplicationRecord
  # Un método de pago tiene muchas reservas. Si el método de pago se destruye, también se destruirán las reservas asociadas.
  has_many :bookings, dependent: :destroy
end