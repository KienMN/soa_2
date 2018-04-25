module ClassPresident::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @organizations = ::OrganizationUser.joins(:organization)
      .where(user_id: @current_user.id)
      .where("organizations.type_organization = #{::Organization.type_organizations[:class]}")
      .pluck(:organization_id)

    @evaluation_form = ::EvaluationForm.eager_load(:comments, :semester)
      .joins(student: [:organization_users])
      .find_by("organization_users.organization_id in (#{@organizations.join(',')})
        and evaluation_forms.id = #{@params[:id]}")
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_form => @evaluation_form,
        :comments        => @evaluation_form.comments,
        :semester        => @evaluation_form.semester
      }
    }
  end
end
