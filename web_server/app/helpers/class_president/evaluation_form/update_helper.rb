module ClassPresident::EvaluationForm::UpdateHelper
  def process
    update_evaluation_form

    generate_status
  end

  private

  def update_evaluation_form
    @organizations = ::OrganizationUser.joins(:organization)
      .where(user_id: @current_user.id)
      .where("organizations.type_organization = #{::Organization.type_organizations[:class]}")
      .pluck(:organization_id)

    @evaluation_form = ::EvaluationForm.joins("users on evaluation_forms.student_id = users.id")
      .joins("organization_users on users.id = organization_users.user_id")
      .find_by("organization_users.organization_id in (#{@organizations.join(',')})
        and evaluation_forms.id = #{@params[:id]}")

    if @evaluation_form.student_id != @current_user.id
      @evaluation_form.calculate_score(
        evaluation_form_params[:target_assignment],
        :class_president_assessment
    else
      @evaluation_form.calculate_score(
        evaluation_form_params[:target_assignment],
        :class_president_assessment_and_self_assessment
    end
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
    @params.permit(:class_president_assessment).merge(:target_assignment => all_options)
  end
end
