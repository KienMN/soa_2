class Api::V1::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_user_authentication
  before_action -> { pre_processing }

  include Session::SessionHelper

  def create
    render json: @action.status
  end

  def destroy
    render json: @action.status
  end
end
