module ClassPresident::Comment::CommentHelper
  def pre_processing
    validate_role

    generate_action

    implementation
  end

  private

  def validate_role
    if @current_user.type != "ClassPresident"
      raise Exception.new("Không cho phép truy cập")
    end
  end

  def generate_action
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
    include ClassPresident::Comment::CreateHelper

    def initialize(options)
      super(options)
    end
  end

  class Destroy < Base
    include ClassPresident::Comment::DestroyHelper

    def initialize(options)
      super(options)
    end
  end
end
