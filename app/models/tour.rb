class Tour < ApplicationRecord
  belongs_to :company, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :comments, dependent: :destroy
  # has_one_attached :image
end
