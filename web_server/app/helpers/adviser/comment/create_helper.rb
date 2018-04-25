module Adviser::Comment::CreateHelper
  def process
    create_comment

    generate_status
  end

  def create_comment
    @evaluation_form = ::EvaluationForm.eager_load(student: [:organizations])
      .where(id: @params[:evaluation_form_id], status: ::EvaluationForm.statuses[:avaiable])
      .where("organizations.type_organization = #{Organization.type_organizations[:class]}")
      .first

    organization_users = ::OrganizationUser.find_by(
      id: @evaluation_form.student.organizations.map{|x| x.id},
      user_id: @current_user.id
    )

    if organization_users.present?
      @new_comment = ::Comment.create(comment_params.merge(
        user_id: @current_user.id
      ))
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @new_comment,
    }
  end

  private
  def comment_params
    @params.permit(:content, :evaluation_form_id)
  end
end
