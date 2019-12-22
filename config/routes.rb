# == Route Map
#
#                   Prefix Verb   URI Pattern                          Controller#Action
#         new_user_session GET    /users/sign_in(.:format)             devise/sessions#new
#             user_session POST   /users/sign_in(.:format)             devise/sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)            devise/sessions#destroy
#        new_user_password GET    /users/password/new(.:format)        devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format)       devise/passwords#edit
#            user_password PATCH  /users/password(.:format)            devise/passwords#update
#                          PUT    /users/password(.:format)            devise/passwords#update
#                          POST   /users/password(.:format)            devise/passwords#create
# cancel_user_registration GET    /users/cancel(.:format)              devise/registrations#cancel
#    new_user_registration GET    /users/sign_up(.:format)             devise/registrations#new
#   edit_user_registration GET    /users/edit(.:format)                devise/registrations#edit
#        user_registration PATCH  /users(.:format)                     devise/registrations#update
#                          PUT    /users(.:format)                     devise/registrations#update
#                          DELETE /users(.:format)                     devise/registrations#destroy
#                          POST   /users(.:format)                     devise/registrations#create
#                     root GET    /                                    groups#index
#                edit_user GET    /users/:id/edit(.:format)            users#edit
#                     user PATCH  /users/:id(.:format)                 users#update
#                          PUT    /users/:id(.:format)                 users#update
#           group_messages GET    /groups/:group_id/messages(.:format) messages#index
#                          POST   /groups/:group_id/messages(.:format) messages#create
#                   groups POST   /groups(.:format)                    groups#create
#                new_group GET    /groups/new(.:format)                groups#new
#               edit_group GET    /groups/:id/edit(.:format)           groups#edit
#                    group PATCH  /groups/:id(.:format)                groups#update
#                          PUT    /groups/:id(.:format)                groups#update

Rails.application.routes.draw do
  
  devise_for :users
  root 'groups#index'
  resources :users, only: [ :edit, :update]
  resources :groups, only: [:new, :create, :update ,:edit,:show]do
    resources :messages, only: [:index, :create]
  end
end
