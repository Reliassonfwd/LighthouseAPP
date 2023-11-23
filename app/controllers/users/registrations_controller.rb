# app/controllers/users/registrations_controller.rb

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json



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

  def sign_up_params
    params.require(:user).permit(:email, :password, :name)
  end
end
