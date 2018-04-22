module Employee::EvaluationForm::EvaluationFormHelper
  def process
    validate_role

    generate_action
  end

  private

  def validate_role
    if @current_user.type == "Employee"
      raise Exeception.new("Không cho phép truy cập")
    end
  end

  def generate_action
    case action_name
    when 'create'
      @action = Create.new({
        params: params, current_user: @current_user
      })
    when 'index'
      @action = Index.new({
        params: params, current_user: @current_user
      })
    when 'show'
      @action = Show.new({
        params: params, current_user: @current_user
      })
    when 'destroy'
      @action = Destroy.new({
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

  class Create < Base
    def initialize(options)
      super(options)
    end
  end

  class Index < Base
    def initialize(options)
      super(options)
    end
  end

  class Show < Base
    def initialize(options)
      super(options)
    end
  end

  class Destroy < Base
    def initialize(options)
      super(options)
    end
  end
end
