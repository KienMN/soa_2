module Adviser::EvaluationForm::ShowHelper
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

    @evaluation_form = ::EvaluationForm.eager_load(:semester, comments: [:user])
      .joins(student: [:organization_users])
      .find_by("organization_users.organization_id in (#{@organizations.join(',')})
        and evaluation_forms.id = #{@params[:id]}")

    @comments = []
    @evaluation_form.comments.each do |c|
      tmp = c.attributes
      tmp.merge!("username" => c.user.username)
      @comments << tmp
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_form => @evaluation_form,
        :comments        => @comments,
        :semester        => @evaluation_form.semester
      }
    }
  end
end
