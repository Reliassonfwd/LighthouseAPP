# Users::SessionsController
#
# Este controlador maneja las sesiones de los usuarios. Hereda de Devise::SessionsController.

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  # respond_with: Genera un token JWT para el usuario que ha iniciado sesión y lo envía en la respuesta JSON.
  def respond_with(resource, _opts = {})
    token = resource.generate_jwt
    render json: {
      status: {
        code: 200,
        message: 'Logged in successfully.',
        token: token
      }
    }, status: :ok
  end

  # respond_to_on_destroy: Se llama cuando un usuario ha cerrado la sesión.
  # Busca al usuario en la base de datos utilizando el token JWT de la solicitud.
  # Si encuentra al usuario, envía una respuesta JSON con un mensaje de éxito.
  # Si no encuentra al usuario, envía una respuesta JSON con un mensaje de error.
  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      begin
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
        current_user = User.find(jwt_payload['sub'])
      rescue JWT::ExpiredSignature
        # Si el token ha expirado, puedes establecer current_user a nil, o manejarlo de la manera que prefieras
        current_user = nil
      end
    end
  
    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end