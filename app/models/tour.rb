class Tour < ApplicationRecord
  # A tour belongs to a company. If the tour is destroyed, the associated company will not be destroyed.
  # This relationship ensures that a tour cannot exist without a company.
  belongs_to :company

  # A tour has many bookings. If the tour is destroyed, the associated bookings will also be destroyed.
  # This means that all bookings related to a specific tour will be removed from the database when that tour is deleted.
  has_many :bookings, dependent: :destroy

  # A tour has many comments. If the tour is destroyed, the associated comments will also be destroyed.
  # This ensures that when a tour is deleted, all of its associated comments are also deleted.
  has_many :comments, dependent: :destroy

  # A tour has an attached image.
  # This allows for each tour to have a visual representation in the form of an image.
  has_one_attached :image

  # A tour must have a name. This validation ensures that a tour cannot be saved to the database without a name.
  validates :name, presence: true

  # A tour must have a description. This validation ensures that a tour cannot be saved to the database without a description.
  validates :description, presence: true

  # A tour must have a duration that is a number. This validation ensures that a tour cannot be saved to the database without a numerical duration.
  validates :duration, numericality: true

  # A tour must have a price that is a number. This validation ensures that a tour cannot be saved to the database without a numerical price.
  validates :price, numericality: true

  # A tour must have a quantity that is an integer. This validation ensures that a tour cannot be saved to the database without an integer quantity.
  validates :quantity, numericality: { only_integer: true }
end