module Employee::Semester::IndexHelper
  def process
    get_semesters

    generate_status
  end

  private

  def get_semesters
    @semesters = ::Semester.all.paginate(
      page: @params[:page],
      per_page: Settings.per_page
    )
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :page      => @params[:page],
        :per_page  => Settings.per_page,
        :semesters => @semesters,
        :total_entries => @semesters.total_entries
      }
    }
  end
end
