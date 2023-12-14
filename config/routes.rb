# routes.rb
#
# Este archivo define las rutas para la aplicación.
# Incluye rutas para la autenticación de usuarios, las API de la versión 1 y las rutas privadas.

Rails.application.routes.draw do
  # Configura las rutas para Devise con rutas personalizadas para iniciar sesión, cerrar sesión y registrarse.
  # Las rutas de sesión y registro se manejan con controladores personalizados.
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Define las rutas para la API de la versión 1. Incluye rutas para bookings, comments, companies, payment_methods, tours, users y la ruta raíz de la API.
  namespace :api do
    namespace :v1 do
      resources :bookings
      resources :comments
      resources :companies
      resources :payments 
      resources :roles
      resources :users_roles
      resources :tours do
      post 'add_image', on: :member
    end

      resources :users
      root to: 'api#index'
    end
  end

  # Define una ruta privada para pruebas.
  namespace :private do
    get 'test', to: 'private#test'
  end
end