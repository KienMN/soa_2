module Session::CreateHelper
  require 'jsonwebtoken'

  def process
    get_auth_token

    generate_status
  end

  private

  def get_auth_token
    @auth_token = JsonWebToken.encode(user_id: @user.id)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Đăng nhập thành công",
      :data    => {
        :user  => @user,
        :token => @auth_token,
      }
    }
  end
end
