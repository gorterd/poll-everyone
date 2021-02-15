# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      root GET    /                                                                                        static_pages#root
#           api_user_groups GET    /api/users/:user_id/groups(.:format)                                                     api/groups#index {:format=>:json}
#                           POST   /api/users/:user_id/groups(.:format)                                                     api/groups#create {:format=>:json}
#            api_user_polls POST   /api/users/:user_id/polls(.:format)                                                      api/polls#create {:format=>:json}
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#                           PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#        api_session_exists GET    /api/session/exists(.:format)                                                            api/sessions#check_if_user_exists {:format=>:json}
#                 api_group PATCH  /api/groups/:id(.:format)                                                                api/groups#update {:format=>:json}
#                           PUT    /api/groups/:id(.:format)                                                                api/groups#update {:format=>:json}
#                           DELETE /api/groups/:id(.:format)                                                                api/groups#destroy {:format=>:json}
#   api_poll_answer_options POST   /api/polls/:poll_id/answer_options(.:format)                                             api/answer_options#create {:format=>:json}
#                  api_poll GET    /api/polls/:id(.:format)                                                                 api/polls#show {:format=>:json}
#                           PATCH  /api/polls/:id(.:format)                                                                 api/polls#update {:format=>:json}
#                           PUT    /api/polls/:id(.:format)                                                                 api/polls#update {:format=>:json}
#                           DELETE /api/polls/:id(.:format)                                                                 api/polls#destroy {:format=>:json}
#         api_answer_option PATCH  /api/answer_options/:id(.:format)                                                        api/answer_options#update {:format=>:json}
#                           PUT    /api/answer_options/:id(.:format)                                                        api/answer_options#update {:format=>:json}
#                           DELETE /api/answer_options/:id(.:format)                                                        api/answer_options#destroy {:format=>:json}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
  post '/graphql', to: 'graphql#execute'
  
  mount ActionCable.server => '/cable'

  root to: 'static_pages#root'
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create, :update] do
      collection do
        get 'presentation'
      end
    end
    
    resource :session, only: [:create, :destroy]
    get 'session/exists', to: 'sessions#check_if_user_exists'
    get 'session/current', to: 'sessions#current'

    resources :groups, only: [:index, :create, :update, :destroy] do
      resources :polls, only: [:create]

      collection do 
        delete 'batch_destroy'
      end

      member do      
        patch 'move_polls'
      end
    end


    resources :polls, only: [:show, :update, :destroy] do 
      resources :answer_options, only: [:create]

      member do
        post 'duplicate'
        patch 'toggle_activation'
      end
    end

    resources :answer_options, only: [:update, :destroy]

    get 'participations/recents', to: 'participations#recents'
  end


end
