# Company
#
# Este modelo representa una compañía en la aplicación. 
# Cada compañía puede tener muchos tours. Si la compañía se destruye, también se destruirán los tours asociados.

class Company < ApplicationRecord
  # Una compañía tiene muchos tours. Si la compañía se destruye, también se destruirán los tours asociados.
  has_many :tours, dependent: :destroy
end