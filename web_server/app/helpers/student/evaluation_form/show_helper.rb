module Student::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @evaluation_form = ::EvaluationForm.eager_load(:comments, :semester)
    .find_by(
      id: @params[:id],
      student_id: @current_user.id
    )
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => {
        :evaluation_form => @evaluation_form,
        :comments        => @evaluation_form.comments,
        :semester        => @evaluation_form.semester
      }
    }
  end
end
