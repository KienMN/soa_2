module Employee::EvaluationForm::DestroyHelper
  def process
    delete_evaluation_form

    generate_status
  end

  private

  def delete_evaluation_form
    ::EvaluationForm.find_by(id: @params[:id]).destroy
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công"
    }
  end
end
