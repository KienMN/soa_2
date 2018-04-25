namespace :test_request do
  task get_student_books: :environment do
    require 'net/http'
    require 'uri'

    uri = URI.parse("http://localhost:3000/api/v1/student/books?page=4")
    response = Net::HTTP.get_response(uri)
    puts response.body
  end

  task sign_in: :environment do
    require 'net/http'
    require 'uri'
    require 'json'


    uri = URI.parse("http://localhost:3000/api/v1/sign_in")
    res = Net::HTTP.post_form(uri, 'username' => "adviser", 'password' => "12345678")
    puts res.body

  end

  task employee_create_comment: :environment do
    require 'net/http'
    require 'uri'
    require 'json'

    uri = URI.parse("http://localhost:3000/api/v1/sign_in")
    res = Net::HTTP.post_form(uri, 'username' => "employee", 'password' => "12345678")

    uri = URI.parse("http://localhost:3000/api/v1/employee/comments/")
    params = {'content' => 'aaaaaa', 'evaluation_form_id' => "1"}

    headers = {
      'Authorization' => "Bearer #{JSON.parse(res.body)['data']['token']}",
      'Content-Type' =>'application/json'
    }

    http = Net::HTTP.new(uri.host, uri.port)
    response = http.post(uri.path, params.to_json, headers)
    output = response.body

    puts output
  end

  task employee_get_evaluation_form: :environment do
    require 'net/http'
    require 'uri'
    require 'json'

    uri = URI.parse("http://localhost:3000/api/v1/sign_in")
    res = Net::HTTP.post_form(uri, 'username' => "employee", 'password' => "12345678")

    uri = URI.parse("http://localhost:3000/api/v1/employee/evaluation_forms?page=1")
    # params = {'page' => '1'}

    headers = {
      'Authorization' => "Bearer #{JSON.parse(res.body)['data']['token']}",
      'Content-Type' =>'application/json'
    }

    http = Net::HTTP.new(uri.host, uri.port)
    response = http.get(uri.path, headers)
    output = response.body

    puts output
  end

  task student_get_evaluation_form: :environment do
    require 'net/http'
    require 'uri'
    require 'json'

    uri = URI.parse("http://localhost:3000/api/v1/sign_in")
    res = Net::HTTP.post_form(uri, 'username' => "student-1", 'password' => "12345678")

    uri = URI.parse("http://localhost:3000/api/v1/student/evaluation_forms?page=1")
    # params = {'page' => '1'}

    headers = {
      'Authorization' => "Bearer #{JSON.parse(res.body)['data']['token']}",
      'Content-Type' =>'application/json'
    }

    http = Net::HTTP.new(uri.host, uri.port)
    response = http.get(uri.path, headers)
    output = response.body

    puts output
  end

  task student_update_evaluation_form: :environment do
    require 'net/http'
    require 'uri'
    require 'json'

    uri = URI.parse("http://localhost:3000/api/v1/sign_in")
    res = Net::HTTP.post_form(uri, 'username' => "student-0", 'password' => "12345678")

    uri = URI.parse("http://localhost:3000/api/v1/student/evaluation_forms/1")
    params = {
      target_assignment: {
        study_result: {
          sub_fields: {
            poor_result:        1,
            warning:            1,
            not_enough_credits: 1,
            exam_skip:          1
          }
        },
        regulations: {
          sub_fields: {
            wrong_payment:            1,
            late_course_registration: 1,
            absence:                  1,
            late_return:              1,
            local_regulations:        1
          }
        },
        activities: {
          sub_fields: {
            full_participation:  1,
            addition_activities: 1,
            activities_absence:  1
          }
        },
        public_relationship: {
          sub_fields: {
            disunity: 1
          }
        },
        special_achivement: {
          sub_fields: {
            important_position:    1,
            high_competion_result: 1,
          }
        }
      }
    }

    headers = {
      'Authorization' => "Bearer #{JSON.parse(res.body)['data']['token']}",
      'Content-Type' =>'application/json'
    }

    http = Net::HTTP.new(uri.host, uri.port)
    response = http.put(uri.path, params.to_json, headers)
    output = response.body

    puts output
  end

  task class_president_get_evaluation_form: :environment do
    require 'net/http'
    require 'uri'
    require 'json'

    uri = URI.parse("http://localhost:3000/api/v1/sign_in")
    res = Net::HTTP.post_form(uri, 'username' => "class_president", 'password' => "12345678")

    uri = URI.parse("http://localhost:3000/api/v1/class_president/evaluation_forms?page=1")

    headers = {
      'Authorization' => "Bearer #{JSON.parse(res.body)['data']['token']}",
      'Content-Type' =>'application/json'
    }

    http = Net::HTTP.new(uri.host, uri.port)
    response = http.get(uri.path, headers)
    output = response.body

    puts output
  end
end
