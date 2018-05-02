class Api::V1::Adviser::EvaluationFormsController < ApplicationController
  before_action :authenticate_request!
  skip_before_action :verify_authenticity_token
  before_action -> { pre_processing }

  include Adviser::EvaluationForm::EvaluationFormHelper

  def index
    render json: @action.status
  end

  def show
    render json: @action.status
  end

  def confirmation
    render json: @action.status
  end
end
