module Student::EvaluationForm::EvaluationFormHelper
  def process
    validate_role

    generate_action
  end

  private

  def validate_role
    if @current_user.type == "Student"
      raise Exeception.new("Không cho phép truy cập")
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
    when 'update'
      @action = Update.new({
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
    include Student::EvaluationForm::IndexHelper

    def initialize(options)
      super(options)
    end
  end

  class Show < Base
    include Student::EvaluationForm::ShowHelper

    def initialize(options)
      super(options)
    end
  end

  class Update < Base
    include Student::EvaluationForm::UpdateHelper

    def initialize(options)
      super(options)
    end
  end
end

