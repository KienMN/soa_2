class Api::V1::Employee::CommentsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token
  before_action -> { pre_processing }

  include Employee::Comment::CommentHelper

  def create
    render json: @action.status
  end

  def destroy
    render json: @action.status
  end
end
