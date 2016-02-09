Rails.application.routes.draw do
  root :to => "home#home"

  get "index1" => "home#index1"

  get 'index2' => "home#index2"

  get 'index3' => "home#index3"

  get 'index4' => "home#index4"

  get 'index5' => "home#index5"

  get 'index6' => "home#index6"

  get 'index7' => "home#index7"

  get 'index8' => "home#index8"
end
