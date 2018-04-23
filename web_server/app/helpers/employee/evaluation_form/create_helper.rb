module Employee::EvaluationForm::CreateHelper
  def process
    create_evaluation_form

    generate_status
  end

  private

  def create_evaluation_form
    @new_evaluation_form = ::EvaluationForm.create_evaluation_form(create_params)
  end

  def generate_status
    @status = {
      :code => Settings.code.success,
      :message => "Thành công",
      :data    => @new_evaluation_form
    }
  end

  def create_params
    @params.permit(:status, :student_id)
  end
end
