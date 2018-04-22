class Api::V1::Student::EvaluationFormsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { pre_processing }

  include Student::EvaluationForm::EvaluationFormHelper

  def index
    render json: @action.status
  end

  def show
    render json: @action.status
  end

  def update
    render json: @action.status
  end
end
