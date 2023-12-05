# Comment
#
# Este modelo representa un comentario en la aplicación. 
# Cada comentario pertenece a un usuario y a un tour.

class Comment < ApplicationRecord
  # Un comentario pertenece a un usuario.
  belongs_to :user

  # Un comentario pertenece a un tour. Si el comentario se destruye, también se destruirá el tour asociado.
  belongs_to :tour, dependent: :destroy
end