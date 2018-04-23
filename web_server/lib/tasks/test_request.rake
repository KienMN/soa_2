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
end
