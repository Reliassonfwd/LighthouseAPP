  Rails.application.routes.draw do
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

  namespace :api do
    namespace :v1 do
      resources :bookings
      resources :comments
      resources :companies
      resources :payment_methods
      resources :tours
      resources :users
      root to: 'api#index'
    end
  end

  namespace :private do
    get 'test', to: 'private#test'
  end
  
end
