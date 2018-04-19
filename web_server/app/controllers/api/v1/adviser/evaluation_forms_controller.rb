class Api::V1::Adviser::EvaluationFormsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { pre_processing }

  def index
    render json: @action.status
  end

  def show
    render json: @action.status
  end
end
