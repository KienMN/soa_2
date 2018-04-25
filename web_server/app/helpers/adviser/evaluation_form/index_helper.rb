module Adviser::EvaluationForm::IndexHelper
  def process
    get_evaluation_forms

    generate_status
  end

  private

  def get_evaluation_forms
    @organizations = ::OrganizationUser.joins(:organization)
      .where(user_id: @current_user.id)
      .where("organizations.type_organization = #{::Organization.type_organizations[:class]}")
      .pluck(:organization_id)

    @evaluation_forms = ::EvaluationForm.eager_load(student: [:organization_users])
      .where("organization_users.organization_id in (?)", @organizations)
      .paginate(page: @params[:page], per_page: Settings.per_page)

    @result = []

    @evaluation_forms.each do |e|
      tmp = e.attributes
      tmp.merge!("username" => e.student.username)

      @result << tmp
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_forms => @result,
        :page             => @params[:page],
        :per_page         => Settings.per_page,
        :total_entries    => @evaluation_forms.total_entries
      }
    }
  end
end
