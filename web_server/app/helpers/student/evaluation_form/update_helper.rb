module Student::EvaluationForm::UpdateHelper
  def process
    update_evaluation_form

    generate_status
  end

  private

  def update_evaluation_form
    @evaluation_form = ::EvaluationForm.find_by(
      id: @params[:id],
      student_id: @current_user.id,
      status: EvaluationForm.statuses[:avaiable]
    )

    @evaluation_form.update_attributes(evaluation_form_params)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @evaluation_form
    }
  end

  def evaluation_form_params
    all_options = @params[:target_assignment].try(:permit!)
    @params.permit(:self_assessment).merge(:target_assignment => all_options)
  end
end
