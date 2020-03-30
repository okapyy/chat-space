Rails.application.routes.draw do

  resources :articles
  root "messages#index"
end
