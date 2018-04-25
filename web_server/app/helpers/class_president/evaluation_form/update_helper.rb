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

    @evaluation_form = ::EvaluationForm.joins(student: [:organization_users])
      .find_by("organization_users.organization_id in (#{@organizations.join(',')})
        and evaluation_forms.id = #{@params[:id]}")

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
    @params.permit(:class_president_assessment).merge(:target_assignment => all_options)
  end
end
