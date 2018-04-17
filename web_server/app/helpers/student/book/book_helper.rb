module Student::Book::BookHelper
  def pre_processing
    case action_name
    when 'show'
      @action = Show.new(params: params)
    when 'index'
      @action = Index.new(params: params)
    end

    implementation
  end

  def implementation
    @action.process
  end

  class Base
    attr_reader :status

    def initialize(options)
      @params = options[:params]
    end
  end

  class Index < Base
    include Student::Book::IndexHelper

    def initialize(options)
      super(options)
    end
  end

  class Show < Base
    include Student::Book::ShowHelper

    def initialize(options)
      super(options)
    end
  end
end
