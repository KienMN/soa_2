module Employee::EvaluationForm::ComfirmationHelper
  def process
    update_evaluation_form

    generate_status
  end

  private

  def update_evaluation_form
    @evaluation_form   = ::EvaluationForm.find_by(id: @params[:id])

    @evaluation_form.update_confirmation(:employee)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @evaluation_form
    }
  end
end
