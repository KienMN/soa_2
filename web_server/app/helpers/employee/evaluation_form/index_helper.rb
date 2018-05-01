module Employee::EvaluationForm::IndexHelper
  def process
    get_evaluation_forms

    generate_status
  end

  private

  def get_evaluation_forms
    @evaluation_forms = ::EvaluationForm.eager_load(:user).all
    .paginate(
      page: @params[:page], per_page: Settings.per_page
    )

    @result = []

    @evaluation_forms.each do |e|
      tmp = e.attributes
      tmp.merge!("username" => e.user.username)

      @result << tmp
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_forms => @result,
        :page             => @params[:page],
        :per_page         => Settings.per_page,
        :total_entries    => @evaluation_forms.total_entries
      }
    }
  end
end
