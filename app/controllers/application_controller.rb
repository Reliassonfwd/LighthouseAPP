# ApplicationController
#
# The base controller for the application, inheriting from ActionController::API.
# It includes common configurations and actions applicable to the entire application.

class ApplicationController < ActionController::API
  # before_action: Configure permitted parameters for Devise controllers.
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    # configure_permitted_parameters: Configures permitted parameters for Devise controllers.
    def configure_permitted_parameters
      # Define attributes allowed for user sign-up and account update.
      attributes = [:name, :email, :password]
      
      # Permit specified attributes for sign-up.
      devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
      
      # Permit specified attributes for account update.
      devise_parameter_sanitizer.permit(:account_update, keys: attributes)
    end
end

