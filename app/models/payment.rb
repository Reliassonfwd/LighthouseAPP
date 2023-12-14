class Payment < ApplicationRecord
  # A payment method has many bookings. If the payment method is destroyed, the associated bookings will also be destroyed.
  # This implies a dependent relationship where the existence of bookings is reliant on the existence of the payment method.
  has_many :bookings, dependent: :destroy

  # A payment method belongs to a user.
  # This means that each payment method is associated with a single user.
  belongs_to :user

  # Before saving the payment method, sensitive data like card number and cvv are encoded.
  before_save :encode_sensitive_data
  # After finding the payment method, sensitive data like card number and cvv are decoded.
  # after_find :decode_sensitive_data

  private 

  def encode_sensitive_data
    # The card number and cvv are encoded using Base64 encoding before saving.
    self.card_number = Base64.strict_encode64(card_number.to_s)
    self.cvv = Base64.strict_encode64(cvv.to_s)
  end

  def decode_sensitive_data
    # The card number and cvv are decoded using Base64 decoding after finding.
    self.card_number = Base64.strict_decode64(card_number.to_s)
    self.cvv = Base64.strict_decode64(cvv.to_s)
  end
end
