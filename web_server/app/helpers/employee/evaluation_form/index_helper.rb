module Employee::EvaluationForm::IndexHelper
  def process
    get_evaluation_forms

    generate_status
  end

  private

  def get_evaluation_forms
    @evaluation_forms = ::EvaluationForm.all.paginate(
      page: @params[:page], per_page: Settings.per_page
    )
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_forms => @evaluation_forms,
        :page             => @params[:page],
        :per_page         => Settings.per_page
      }
    }
  end
end
