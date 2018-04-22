class Api::V1::ClassPresident::EvaluationFormsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { pre_processing }

  include ClassPresident::EvaluationForm::EvaluationFormHelper

  def index
    render json: @action.status
  end

  def show
    render json: @action.status
  end

  def update
    render json: @action.status
  end

  def confirmation
    render json: @action.status
  end
end
