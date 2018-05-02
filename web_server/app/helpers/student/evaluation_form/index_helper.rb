module Student::EvaluationForm::IndexHelper
  def process
    get_evaluation_forms

    generate_status
  end

  private

  def get_evaluation_forms
    @evaluation_forms = ::EvaluationForm.where(student_id: @current_user.id)
      .paginate(page: @params[:page], per_page: Settings.per_page)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_forms => @evaluation_forms,
        :page             => @params[:page],
        :per_page         => Settings.per_page,
        :total_entries    => @evaluation_forms.total_entries
      }
    }
  end
end
