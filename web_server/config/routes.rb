Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#home"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post "sign_in", :to => "sessions#create"

      namespace :student do
        resources :comments, only: [:create, :destroy]
        resources :evaluation_forms, only: [:index, :show, :update]
      end

      namespace :class_president do
        resources :comments, only: [:create, :destroy]
        resources :evaluation_forms, only: [:index, :show, :update] do
          put :confirmation, on: :collection
        end
      end

      namespace :adviser do
        resources :comments, only: [:create, :destroy]
        resources :evaluation_forms, only: [:index, :show, :update] do
          put :confirmation, on: :collection
        end
      end

      namespace :employee do
        resources :comments, only: [:create, :destroy]
        resources :evaluation_forms, only: [:index, :show, :create, :destroy] do
          put :confirmation, on: :collection
        end
        resources :semesters, only: [:create, :update, :show, :index, :destroy]
      end
    end
  end

  get "*path", :to => "static_pages#home"
end
