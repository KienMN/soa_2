module Employee::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @evaluation_form = ::EvaluationForm.find_by(id: @params[:id])
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @evaluation_form
    }
  end
end
