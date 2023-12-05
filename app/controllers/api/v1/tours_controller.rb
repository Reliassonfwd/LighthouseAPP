# Api::V1::ToursController
#
# Este controlador maneja las solicitudes a la API relacionadas con los tours.

class Api::V1::ToursController < ApplicationController
  # Antes de ejecutar ciertos métodos, se ejecuta el método set_tour.
  before_action :set_tour, only: [:show, :edit, :update, :destroy]

  # index: Recopila todos los tours y los envía en la respuesta JSON.
  def index
    @tours = Tour.all.map do |tour|
      if tour.image.attached?
        tour.attributes.merge({ image: rails_blob_url(tour.image) })
      else
        tour.attributes
      end
    end
    render json: @tours
  end

  # create: Crea un nuevo tour. Si la creación es exitosa, envía el tour en la respuesta JSON.
  # Si no, envía los errores de validación en la respuesta JSON.
  def create
    @tour = Tour.new(tour_params)
    authorize @tour

    if @tour.save
      render json: @tour, status: :created
    else
      render json: @tour.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @tour.as_json.merge({ image: url_for(@tour.image) })
  end
  
  # new: Crea una nueva instancia de tour.
  def new
    @tour = Tour.new
  end

  # edit: Método vacío, incluido por completitud.
  def edit; end

  # update: Actualiza un tour existente. Si el usuario actual es un administrador y la actualización es exitosa, 
  # envía el tour en la respuesta JSON. Si la actualización falla, envía los errores de validación en la respuesta JSON.
  # Si el usuario actual no es un administrador, envía un error de autorización en la respuesta JSON.
  def update
    @tour = Tour.find(params[:id])
    authorize @tour

    if current_user.admin?
      if @tour.update(tour_params)
        render json: @tour
      else
        render json: @tour.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'No tienes permiso para actualizar este tour' }, status: :forbidden
    end
  end

  # destroy: Elimina un tour existente y redirige al usuario a la lista de tours.
  def destroy
    @tour.destroy
    redirect_to tours_url, notice: 'Tour was successfully destroyed.'
  end

  # add_image: Encuentra el tour especificado por params[:id] y adjunta una imagen a él.
  # La imagen se carga desde una ruta de archivo específica y se adjunta al tour.
  # Luego, se genera una URL para la imagen y se envía en la respuesta JSON junto con un mensaje de éxito.
  def add_image
    @tour = Tour.find(params[:id])
    @tour.image.attach(params[:image]) # Attach the image to the tour
      if @tour.save
        render json: { message: 'Image was successfully attached.' }
      else
        render json: @tour.errors, status: :unprocessable_entity
    end
  end

  private

  # set_tour: Encuentra el tour especificado por params[:id] y lo asigna a @tour.
  def set_tour
    @tour = Tour.find(params[:id])
  end

  # tour_params: Este método se encarga de manejar la seguridad de los parámetros del tour.
  # Requiere que los parámetros incluyan un :tour y permite :name, :description, :duration, :price, :availability, :company_id, :quantity, :includes.
  def tour_params
    params.require(:tour).permit(:name, :description, :duration, :price, :availability, :company_id, :quantity, :includes)
  end
end
