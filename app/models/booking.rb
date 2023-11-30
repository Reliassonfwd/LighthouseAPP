class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :tour, dependent: :destroy
  belongs_to :payment_method, dependent: :destroy
end
