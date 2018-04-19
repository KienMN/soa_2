module SessionHelper
  def pre_processing
    case action_name
    when 'create'
      @action = Show.new(params: params)
    when 'destroy'
      @action = Index.new(params: params)
    end
  end

  def implementation
    @action.process
  end

  class Base
    attr_reader :status

    def initialize(options)
      @options = options
    end
  end

  class Create < Base
    def initialize(options)
      super(options)
    end
  end

  def init_data
    session[:user] = @user
  end
end
