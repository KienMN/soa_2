class Api::V1::Employee::EvaluationFormsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { pre_processing }

  include Employee::EvaluationForm::EvaluationFormHelper

  def create
    render json: @action.status
  end

  def destroy
    render json: @action.status
  end

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
