class Api::V1::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_user_authentication

  def create
    @auth_token = JsonWebToken.encode(user_id: @user.id)

    render json: {
      :code    => Settings.code.success,
      :message => "Đăng nhập thành công",
      :data    => {
        :user  => @user,
        :token => @auth_token,
      }
    }
  end
end
