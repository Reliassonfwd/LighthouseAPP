# PaymentMethod
#
# Este modelo representa un método de pago en la aplicación. 
# Cada método de pago puede tener muchas reservas. Si el método de pago se destruye, también se destruirán las reservas asociadas.

class Payment < ApplicationRecord
  # Un método de pago tiene muchas reservas. Si el método de pago se destruye, también se destruirán las reservas asociadas.
  has_many :bookings, dependent: :destroy

  before_save :encode_sensitive_data
  # after_find :decode_sensitive_data

  private 

  def encode_sensitive_data
    self.card_number = Base64.strict_encode64(card_number.to_s)
    self.cvv = Base64.strict_encode64(cvv.to_s)
  end

  def decode_sensitive_data
    self.card_number = Base64.strict_decode64(card_number.to_s)
    self.cvv = Base64.strict_decode64(cvv.to_s)
  end


end