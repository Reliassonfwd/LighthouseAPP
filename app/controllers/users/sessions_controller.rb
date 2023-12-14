# Users::SessionsController
#
# This controller handles the sessions of users. It inherits from Devise::SessionsController.

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_signed_out_user, only: :destroy
  respond_to :json

  # respond_with: Generates a JWT token for the user who has logged in and sends it in the JSON response.
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

  # respond_to_on_destroy: Called when a user has logged out.
  # Searches for the user in the database using the JWT token from the request.
  # If it finds the user, it sends a JSON response with a success message.
  # If it does not find the user, it sends a JSON response with an error message.
  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      begin
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
        current_user = User.find(jwt_payload['sub'])
      rescue JWT::ExpiredSignature
        # If the token has expired, you can set current_user to nil, or handle it however you prefer
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
