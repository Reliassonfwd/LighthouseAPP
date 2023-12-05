# Users::RegistrationsController
#
# Este controlador maneja el registro de los usuarios. Hereda de Devise::RegistrationsController.

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # create: Crea un nuevo usuario. Si la creación es exitosa, inicia la sesión del usuario y envía una respuesta JSON con un mensaje de éxito.
  # Si no, envía una respuesta JSON con un mensaje de error y los errores de validación.
  def create
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      render json: { status: { code: 200, message: 'Signed up successfully.' } }
    else
      render json: { status: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" } }, status: :unprocessable_entity
    end
  end

  private

  # sign_up_params: Este método se encarga de manejar la seguridad de los parámetros de registro.
  # Requiere que los parámetros incluyan un :user y permite :email, :password y :name.
  def sign_up_params
    params.require(:user).permit(:email, :password, :name)
  end
end