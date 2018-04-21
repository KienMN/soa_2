class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  require 'jsonwebtoken'
  include ApplicationHelper

  respond_to :json

  def get_current_user
    return unless session[:user]

    @current_user ||= User.new(get_current_user_in_session)
  end

  protected

  def authenticate_request!
    user_has_logged_in?

    user_session_assignment

    get_current_user
  end

  def load_user_authentication
    username_checking

    query_hash = generate_query_hash

    @user = User.find_by query_hash
  end
end
