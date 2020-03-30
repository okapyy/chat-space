Rails.application.routes.draw do
  get 'messages/index'

  resources :articles
  root "messages#index"
end
