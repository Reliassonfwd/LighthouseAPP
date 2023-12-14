# cors.rb
#
# Este archivo configura el middleware de CORS (Cross-Origin Resource Sharing) para la aplicación.
# Permite solicitudes desde el origen 'http://localhost:3000' y expone la cabecera de autorización.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Permite solicitudes desde el origen 'http://localhost:3000'.
    origins 'http://localhost:3000'

    # Permite cualquier recurso, con cualquier cabecera y los métodos HTTP get, post, put, patch, delete, options y head.
    # También expone la cabecera de autorización.
    resource '*',
            headers: :any,
            methods: %i[get post put patch delete options head],
            expose: [:Authorization]
  end
end