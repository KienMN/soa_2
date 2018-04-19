namespace :sample_data do
  desc "Task description"
  task generate: :environment do
    puts "Create User"
    Adviser.create(
      username: "adviser", password: "12345678"
    )
    Employee.create(
      username: "employee", password: "12345678"
    )
    class_president = ClassPresident.create(
      username: "class_president", password: "12345678"
    )
    Student.bulk_insert do |worker|
      10.times do |i|
        worker.add(
          username: "student-#{i}",
          password: "12345678"
        )
      end
    end

    puts "Create Organization"
    class_1 = Organization.create(
      title: "K60CLC",
      type_organization: Organization.type_organizations[:class]
    )

    puts "Create Organization User"
    OrganizationUser.bulk_insert do |worker|
      Student.all.each do |student|
        worker.add(
          user_id: student.id,
          organization_id: class_1.id
        )
      end
    end

    puts "Create Semester"
    semester = Semester.create(
      title: "Kỳ 1 2017 - 2018",
      status: Semester.statuses[:avaiable]
    )

    puts "Create Evaluation Form"
    EvaluationForm.bulk_insert do |worker|
      Student.all.each do |student|
        worker.add(
          target_assignment: EvaluationForm.generate_form,
          semester_id: semester.id,
          student_id: student.id,
          class_president: class_president.id,
        )
      end
    end
  end
end
