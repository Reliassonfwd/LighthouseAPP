# Tour
#
# Este modelo representa un tour en la aplicación. 
# Cada tour pertenece a una compañía y puede tener muchas reservas y comentarios. 
# Si el tour se destruye, también se destruirán la compañía, las reservas y los comentarios asociados.
# Además, cada tour tiene una imagen adjunta.

class Tour < ApplicationRecord
  # Un tour pertenece a una compañía. Si el tour se destruye, también se destruirá la compañía asociada.
  belongs_to :company, dependent: :destroy

  # Un tour tiene muchas reservas. Si el tour se destruye, también se destruirán las reservas asociadas.
  has_many :bookings, dependent: :destroy

  # Un tour tiene muchos comentarios. Si el tour se destruye, también se destruirán los comentarios asociados.
  has_many :comments, dependent: :destroy

  # Un tour tiene una imagen adjunta.
  has_one_attached :image
end