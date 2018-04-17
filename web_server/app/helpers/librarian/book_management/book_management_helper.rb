module Librarian::BookManagement::BookManagementHelper
  def pre_processing
    case action_name
    when 'create'
      @action = Create.new(params: params)
    when 'show'
      @action = Show.new(params: params)
    when 'index'
      @action = Index.new(params: params)
    when 'update'
      @action = Update.new(params: params)
    when 'destroy'
      @action = Destroy.new(params: params)
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

  class Create < Base
    include Librarian::BookManagement::CreateHelper

    def initialize(options)
      super(options)
    end
  end

  class Index < Base
    include Librarian::BookManagement::IndexHelper

    def initialize(options)
      super(options)
    end
  end

  class Show < Base
    include Librarian::BookManagement::ShowHelper

    def initialize(options)
      super(options)
    end
  end

  class Update < Base
    include Librarian::BookManagement::UpdateHelper

    def initialize(options)
      super(options)
    end
  end

  class Destroy < Base
    include Librarian::BookManagement::DestroyHelper

    def initialize(options)
      super(options)
    end
  end
end
