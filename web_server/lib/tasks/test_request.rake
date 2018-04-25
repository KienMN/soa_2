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
      :target_assignment => EvaluationForm.generate_form,
      :self_assessment   => 70
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
