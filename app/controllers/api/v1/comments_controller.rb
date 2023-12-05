# Api::V1::CommentsController
#
# Este controlador maneja las solicitudes a la API relacionadas con los comentarios.

class Api::V1::CommentsController < ApplicationController
  # Antes de ejecutar ciertos métodos, se ejecuta el método set_comment.
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # index: Recopila todos los comentarios para un tour específico o todos los comentarios si no se proporciona un tourId.
  def index
    if params[:tourId]
      @comments = Comment.includes(:user, :tour).where(tour_id: params[:tourId])
    else
      @comments = Comment.includes(:user, :tour).all
    end
    render json: @comments.as_json(include: { user: { only: [:name] }, tour: { only: [:name] } })
  end

  # show: Envía el comentario especificado en la respuesta JSON.
  def show
    render json: @comment
  end

  # new: Crea una nueva instancia de comentario.
  def new
    @comment = Comment.new
  end
end