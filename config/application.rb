require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Lighthouse
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.action_controller.forgery_protection_origin_check = false
    config.action_controller.per_form_csrf_tokens = true
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true


    config.active_storage.variable_content_types = ['image/jpg']
config.active_storage.silence_invalid_content_types_warning = true


    config.autoload_paths << Rails.root.join('app/services')

    # config/application.rb

config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  address: 'wilroger26@hotmail.com',
  port: 587,
  user_name: 'LightHouse',
  password: 'wilroger26',
  authentication: 'plain',
  enable_starttls_auto: true
}

  end
end
