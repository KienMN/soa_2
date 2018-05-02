module ApplicationHelper

  def get_current_user_in_session
    current_user_hash = {}
    if session[:user].class == Hash
      current_user_hash = session[:user]
    elsif session[:user].present?
      current_user_hash = session[:user].attributes
    end

    return current_user_hash
  end

  def user_session_assignment
    if session[:user].blank?
      session[:user] = User.find_by(id: @payload.first['user_id'])
    end
  end

  def user_has_logged_in?
    @token = request.headers['Authorization'].split(' ').last rescue nil
    @payload = JsonWebToken.decode(@token)
    if (@payload.nil? || !JsonWebToken.valid_payload(@payload.first))
      return render json: {
        :code => Settings.code.failure,
        :message => "Bạn cần phải đăng nhập trước khi tiếp tục.",
      }
    end
  end

  def generate_query_hash
    return {
      username: user_params[:username],
      password: user_params[:password]
    }
  end

  def username_checking
    raise Exception.new("Tên đăng nhập hoặc mật khẩu không đúng") if user_params[:username].blank?
  end

  def account_validation
    if @user.blank?
      return render json: {
        :code => Settings.code.failure,
        :message => "Tên đăng nhập hoặc mật khẩu không đúng"
      }
    end
  end

  private
  def user_params
    params.permit :username, :password
  end
end
