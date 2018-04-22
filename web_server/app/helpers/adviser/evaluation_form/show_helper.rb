module Adviser::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @organization_users = ::OrganizationUser.joins(:organization)
      .where(user_id: @current_user.id)
      .where("organizations.status = #{::Organization.type_organizations[:class]}")
      .pluck(:id)[0]

    @evaluation_form = ::EvaluationForm.joins(student: [:organization_users])
      .where("organization_users.organization_id in (?)", @organization_users)
      .where(id: @params[:id]).limit(1)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @evaluation_form
    }
  end
end
