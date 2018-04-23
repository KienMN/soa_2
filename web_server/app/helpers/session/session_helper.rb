module Session::SessionHelper
  def pre_processing
    generate_action

    implementation
  end

  private

  def generate_action
    case action_name
    when 'create'
      session[:user] = @user

      @action = Create.new({
        params: params, user: @user
      })
    when 'destroy'
      @action = Destroy.new({
        params: params
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
      @user   = options[:user]
    end
  end

  class Create < Base
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
