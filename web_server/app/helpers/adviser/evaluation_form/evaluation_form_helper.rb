module Adviser::EvaluationForm::EvaluationFormHelper
  def pre_processing
    validate_role

    generate_action

    implementation
  end

  private

  def validate_role
    if @current_user.type != "Adviser"
      raise Exception.new("Không cho phép truy cập")
    end
  end

  def generate_action
    case action_name
    when 'index'
      @action = Index.new({
        params: params, current_user: @current_user
      })
    when 'show'
      @action = Show.new({
        params: params, current_user: @current_user
      })
    when 'confirmation'
      @action = Confirmation.new({
        params: params, current_user: @current_user
      })
    end
  end

  def implementation
    @action.process
  end

  class Base
    attr_reader :status

    def initialize(options)
      @params = options[:params]
      @current_user = options[:current_user]
    end
  end

  class Index < Base
    include Adviser::EvaluationForm::IndexHelper

    def initialize(options)
      super(options)
    end
  end

  class Show < Base
    include Adviser::EvaluationForm::ShowHelper

    def initialize(options)
      super(options)
    end
  end

  class Confirmation < Base
    include Adviser::EvaluationForm::ConfirmationHelper

    def initialize(options)
      super(options)
    end
  end
end
