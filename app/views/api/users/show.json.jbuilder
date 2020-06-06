json.set! @user.id do
  json.partial! '/api/users/user', user: @user
  json.default_group @user.default_group