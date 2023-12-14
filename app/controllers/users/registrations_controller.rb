# Users::RegistrationsController
#
# This controller handles the registration of users. It inherits from Devise::RegistrationsController.

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # create: Creates a new user. If the creation is successful, it starts the user's session and sends a JSON response with a success message.
  # If not, it sends a JSON response with an error message and the validation errors.
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

  # sign_up_params: This method handles the security of the registration parameters.
  # It requires the parameters to include a :user and allows :email, :password, and :name.
  def sign_up_params
    params.require(:user).permit(:email, :password, :name)
  end
end
