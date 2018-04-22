module ClassPresident::EvaluationForm::ComfirmationHelper
  def process
    update_evaluation_form

    generate_status
  end

  private

  def update_evaluation_form
    @evaluation_form   = ::EvaluationForm.find_by(id: @params[:id])
    confirmation_value = ::EvaluationForm::COMFIRMATION[:class_president]

    if @evaluation_form.confirmation % confirmation_value == 0
      @evaluation_form.update_attributes(
        confirmation: @evaluation_form / confirmation_value
      )
    else
      @evaluation_form.update_attributes(
        confirmation: @evaluation_form * confirmation_value
      )
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @evaluation_form
    }
  end
end
