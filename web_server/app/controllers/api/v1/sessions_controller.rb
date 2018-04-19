class Api::V1::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_user_authentication

  include SessionHelper
  respond_to :json

  def create
    render json: @action.status
    init_data

    user_hash = @user.extract({:current_user_type => @user.type})

    if @user.valid_password?(user_params[:password])
      render json: {
        :code    => Settings.code.success,
        :message => "Đăng nhập thành công",
        :data    => {
          :user           => user_hash,
          :token          => @auth_token,
          :firebase_token => Chat.generate_token(@user.id),
          :menu           => @menu_structure,
        }
      }, status: 200
    else
      render json: {
        :code    => Settings.code.failure,
        :message => "Mật khẩu không chính xác!"
      }
    end
  end

  private
  def user_params
    params.permit :username, :password
  end
end
