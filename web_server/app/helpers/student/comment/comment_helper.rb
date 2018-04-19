module Student::Comment::CommentHelper
  def pre_processing
    validate_role

    switch_case

    implementation
  end

  def validate_role
    if @current_user.type == "Student"
      raise Exeception.new("Không cho phép truy cập")
    end
  end

  def switch_case
    case action_name
    when 'create'
      @action = Create.new(
        params: params, current_user: @current_user
      )
    when 'destroy'
      @action = Destroy.new(
        params: params, current_user: @current_user
      )
    end
  end

  def implementation
    @action.process
  end

  class Base
    attr_reader :status

    def initialize(options)
      @params       = options[:params]
      @current_user = options[:current_user]
    end
  end

  class Create < Base
    include Student::Comment::CreateHelper

    def initialize(options)
      super(options)
    end
  end

  class Destroy < Base
    include Student::Comment::DestroyHelper

    def initialize(options)
      super(options)
    end
  end
end
