# Api::V1::CompaniesController
#
# Este controlador maneja las solicitudes a la API relacionadas con las compañías.

class Api::V1::CompaniesController < ApplicationController
  # Antes de ejecutar ciertos métodos, se ejecuta el método set_company.
  before_action :set_company, only: [:show, :edit, :update, :destroy]

  # index: Recopila todas las compañías y las envía en la respuesta JSON.
  def index
    @companies = Company.all
    render json: @companies
  end

  # show: Envía la compañía especificada en la respuesta JSON.
  def show
    render json: @company
  end

  # new: Crea una nueva instancia de compañía.
  def new
    @company = Company.new
  end

  # edit: Método vacío, incluido por completitud.
  def edit; end

  # create: Crea una nueva compañía. Si la creación es exitosa, redirige al usuario a la compañía.
  # Si no, vuelve a renderizar la vista de new.
  def create
    @company = Company.new(company_params)
    if @company.save
      redirect_to @company, notice: 'Company was successfully created.'
    else
      render :new
    end
  end

  # update: Actualiza una compañía existente. Si la actualización es exitosa, redirige al usuario a la compañía.
  # Si no, vuelve a renderizar la vista de edit.
  def update
    if @company.update(company_params)
      redirect_to @company, notice: 'Company was successfully updated.'
    else
      render :edit
    end
  end

  # destroy: Elimina una compañía existente y redirige al usuario a la lista de compañías.
  def destroy
    @company.destroy
    redirect_to companies_url, notice: 'Company was successfully destroyed.'
  end

  private

  # set_company: Encuentra la compañía especificada por params[:id] y la asigna a @company.
  def set_company
    @company = Company.find(params[:id])
  end

  # company_params: Este método se encarga de manejar la seguridad de los parámetros de la compañía.
  # Requiere que los parámetros incluyan un :company y permite :name, :description, :location, :industry.
  def company_params
    params.require(:company).permit(:name, :description, :location, :industry)
  end
end