# Api::V1::UsersController
#
# Este controlador maneja las solicitudes a la API relacionadas con los usuarios.

class Api::V1::UsersController < ApplicationController
  # Antes de ejecutar ciertos métodos, se ejecutan los métodos set_user y authenticate_user.
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # index: Recopila todos los usuarios y los envía en la respuesta JSON.
  def index
    @users = User.all
    render json: @users
  end

  # show: Envía el usuario especificado en la respuesta JSON.
  def show
    render json: @user
  end

  # create: Crea un nuevo usuario. Si la creación es exitosa, envía el usuario en la respuesta JSON.
  # Si no, envía los errores de validación en la respuesta JSON.
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # update: Actualiza un usuario existente. Si la actualización es exitosa, envía el usuario en la respuesta JSON.
  # Si no, envía los errores de validación en la respuesta JSON.
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # destroy: Elimina un usuario existente y envía una respuesta HTTP sin contenido.
  def destroy
    @user.destroy
    head :no_content
  end

  private

  # set_user: Encuentra el usuario especificado por params[:id] y lo asigna a @user.
  # Si no se encuentra el usuario, envía un error en la respuesta JSON.
  def set_user
    @user = User.find_by(id: params[:id])
    unless @user
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  # user_params: Este método se encarga de manejar la seguridad de los parámetros del usuario.
  # Requiere que los parámetros incluyan un :user y permite :name, :email, :password.
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end