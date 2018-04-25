module ClassPresident::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @organization_users = ::OrganizationUser.joins(:organization)
      .where(user_id: @current_user.id)
      .where("organizations.status = #{::Organization.type_organizations[:class]}")
      .pluck(:id)

    @evaluation_form = ::EvaluationForm.joins(student: [:organization_users])
      .find_by("organization_users.organization_id in (#{@organization_users.join(',')})
        and evaluation_forms.id = #{@params[:id]}")
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @evaluation_form
    }
  end
end
