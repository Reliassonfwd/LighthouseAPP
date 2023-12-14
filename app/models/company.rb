# Company
#
# This model represents a company in the application.
# Each company can have many tours. If the company is destroyed, the associated tours will also be destroyed.

class Company < ApplicationRecord
  # A company has many tours. If the company is destroyed, the associated tours will also be destroyed.
  # This implies a dependent relationship where the existence of tours is reliant on the existence of the company.
  has_many :tours, dependent: :destroy
end
