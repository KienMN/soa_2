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
end
