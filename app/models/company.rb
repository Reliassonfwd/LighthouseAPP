class Company < ApplicationRecord
  has_many :tours, dependent: :destroy
end
