module Student::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @semester = ::EvaluationForm.find_by(
      id: @params[:id],
      student_id: @current_user.id
    )
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @semester
    }
  end
end
