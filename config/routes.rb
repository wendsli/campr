Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/', to: "static_pages#index"
  get '/campgrounds', to: "static_pages#index"
  get '/campgrounds/new', to: "static_pages#authenticate"
  get '/campgrounds/:id', to: "static_pages#authenticate"

  namespace :api do
    namespace :v1 do
      resources :campgrounds, only: [:index, :show, :create]
    end
  end
end
