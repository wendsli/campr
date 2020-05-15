Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/campgrounds', to: "static_pages#index"
  get '/campgrounds/:id', to: "static_pages#index"
  get '/campgrounds/new', to: "static_pages#index"

  namespace :api do
    namespace :v1 do
      # get 'campgrounds/weather' => "campgrounds#weather"
      resources :campgrounds, only: [:index, :show, :create]
    end
  end
end
