module Adviser::Comment::CreateHelper
  def process
    create_comment

    generate_status
  end

  def create_comment
    @evaluation_form = ::EvaluationForm.eager_load(student: [:organizations])
      .find_by("evaluation_forms.id = #{@params[:evaluation_form_id]} and
                evaluation_forms.status = #{::EvaluationForm.statuses[:avaiable]} and
                organizations.type_organization = #{Organization.type_organizations[:class]}")

    organization_users = ::OrganizationUser.find_by(
      organization_id: @evaluation_form.student.organizations.map{|x| x.id},
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
      :data    => @new_comment.attributes.merge!(username: @new_comment.user.username),
    }
  end

  private
  def comment_params
    @params.permit(:content, :evaluation_form_id)
  end
end
