class EvaluationForm < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :semester
  belongs_to :student, class_name: "Student", foreign_key: "student_id"
  belongs_to :user, foreign_key: "student_id"

  enum status: [:avaiable, :complete, :closed, :out_of_date]
  enum classification: [:weak, :medium, :middling, :good, :excellent]

  COMFIRMATION = {
    class_president: 2,
    adviser: 3,
    employee: 5
  }

  CLASSIFICATION = {
    excellent: {
      upper_limit: 100,
      lower_limit: 90,
      desc: "Xuất sắc"
    },
    good: {
      upper_limit: 90,
      lower_limit: 80,
      desc: "Giỏi"
    },
    middling: {
      upper_limit: 80,
      lower_limit: 60,
      desc: "Khá"
    },
    medium: {
      upper_limit: 60,
      lower_limit: 40,
      desc: "Trung bình"
    },
    weak: {
      upper_limit: 40,
      lower_limit: 0,
      desc: "Yếu"
    },
  }

  FORM = {
    study_result: {
      max_score: 30,
      min_score: 0,
      init_score: 30,
      desc: "Kết quả học tập",
      sub_fields: {
        poor_result: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 3,
          desc: "Kết quả học tập kém"
        },
        warning: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 5,
          desc: "Cảnh báo học vụ"
        },
        not_enough_credits: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 5,
          desc: "Thiếu tín chỉ"
        },
        exam_skip: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 2,
          desc: "Bỏ thi"
        }
      }
    },
    regulations: {
      max_score: 25,
      min_score: 0,
      init_score: 25,
      sub_fields: {
        wrong_payment: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 5,
          desc: "Nộp hoặc nhận tiền sai"
        },
        late_course_registration: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 2,
          desc: "Đăng ký học muộn"
        },
        absence: {
          type: "minus",
          max_num_of_times: nil,
          min_num_of_times: 0,
          point: 5,
          desc: "Vắng mặt trong các buổi triệu tập"
        },
        late_return: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 5,
          desc: "Trả tài liệu, hồ sơ muộn"
        },
        local_regulations: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 10,
          desc: "Vi phạm quy định tại địa phương"
        }
      }
    },
    activities: {
      max_score: 20,
      min_score: 0,
      init_score: 0,
      sub_fields: {
        full_participation: {
          type: "plus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 10,
          desc: "Tham gia đầy đủ"
        },
        addition_activities: {
          type: "plus",
          max_num_of_times: nil,
          min_num_of_times: 0,
          point: 2,
          desc: "Hoạt động ngoại khoá"
        },
        activities_absence: {
          type: "minus",
          max_num_of_times: nil,
          min_num_of_times: 0,
          point: 5,
          desc: "Vắng mặt trong các hoạt động"
        }
      }
    },
    public_relationship: {
      max_score: 15,
      min_score: 0,
      init_score: 15,
      sub_fields: {
        disunity: {
          type: "minus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 5,
          desc: "Mất đoàn kết tập thể"
        }
      }
    },
    special_achivement: {
      max_score: 10,
      min_score: 0,
      init_score: 0,
      desc: "Thành tích đặc biệt",
      sub_fields: {
        important_position: {
          type: "plus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 10,
          desc: "Chức vụ quan trọng"
        },
        high_competion_result: {
          type: "plus",
          max_num_of_times: 1,
          min_num_of_times: 0,
          point: 5,
          desc: "Kết quả cao trong các cuộc thi"
        },
      }
    }
  }

  def update_confirmation(type)
    confirmation_value = EvaluationForm::COMFIRMATION[type]

    if self.confirmation % confirmation_value == 0
      self.update_attributes(
        confirmation: self.confirmation / confirmation_value
      )
    else
      self.update_attributes(
        confirmation: self.confirmation * confirmation_value
      )
    end

    if self.confirmation % EvaluationForm::COMFIRMATION[:class_president] == 0 and
       self.confirmation % EvaluationForm::COMFIRMATION[:employee] == 0 and
       self.confirmation % EvaluationForm::COMFIRMATION[:adviser] == 0
      self.update_attributes(
        status: EvaluationForm.statuses[:complete]
      )
    else
      self.update_attributes(
        status: EvaluationForm.statuses[:avaiable]
      )
    end
  end

  def calculate_score(params, score_type)
    total_score = 0
    filled_form = EvaluationForm.generate_form

    ['study_result',
      'regulations',
      'activities',
      'public_relationship',
      'special_achivement'
    ].each do |field|
      if params[field].blank?
        raise Exception.new("Thất bại")
      end

      current_field   = params[field]
      current_field_s = FORM[field.to_sym]

      current_field['sub_fields'].each do |sub_field_key, sub_field_value|
        if current_field_s[:sub_fields][sub_field_key.to_sym][:max_num_of_times].present? and
           current_field_s[:sub_fields][sub_field_key.to_sym][:max_num_of_times] < sub_field_value and
          raise Exception.new("Thất bại")
        end

        if current_field_s[:sub_fields][sub_field_key.to_sym][:min_num_of_times].present? and
           current_field_s[:sub_fields][sub_field_key.to_sym][:min_num_of_times] > sub_field_value and
          raise Exception.new("Thất bại")
        end

        case current_field_s[:sub_fields][sub_field_key.to_sym][:type]
        when 'plus'
          sub_field_score = current_field_s[:sub_fields][sub_field_key.to_sym][:point] * sub_field_value.abs
          filled_form[field.to_sym][:sub_fields][sub_field_key.to_sym][:score] = sub_field_score
          filled_form[field.to_sym][:score] += sub_field_score
        when 'minus'
          sub_field_score = current_field_s[:sub_fields][sub_field_key.to_sym][:point] * sub_field_value.abs
          filled_form[field.to_sym][:sub_fields][sub_field_key.to_sym][:score] = sub_field_score
          filled_form[field.to_sym][:score] -= sub_field_score
        end
      end

      if filled_form[field.to_sym][:score] < current_field_s[:min_score]
        filled_form[field.to_sym][:score] = current_field_s[:min_score]
      elsif filled_form[field.to_sym][:score] > current_field_s[:max_score]
        filled_form[field.to_sym][:score] = current_field_s[:max_score]
      end

      total_score += filled_form[field.to_sym][:score]
    end

    CLASSIFICATION.each do |k, v|
      if v[:upper_limit] >= total_score and
         v[:lower_limit] <= total_score
        self.classification = EvaluationForm.classifications[k]
      end
    end

    case score_type.to_sym
    when :self_assessment
      self.self_assessment = total_score
    when :class_president_assessment
      self.class_president_assessment = total_score
    when :class_president_assessment_and_self_assessment
      self.self_assessment = total_score
      self.class_president_assessment = total_score
    end

    self.target_assignment = filled_form
    self.save
  end

  class << self
    def generate_form
      return {
        study_result: {
          score: 30,
          sub_fields: {
            poor_result:        {score: 0},
            warning:            {score: 0},
            not_enough_credits: {score: 0},
            exam_skip:          {score: 0}
          }
        },
        regulations: {
          score: 25,
          sub_fields: {
            wrong_payment:            {score: 0},
            late_course_registration: {score: 0},
            absence:                  {score: 0},
            late_return:              {score: 0},
            local_regulations:        {score: 0}
          }
        },
        activities: {
          score: 0,
          sub_fields: {
            full_participation:  {score: 0},
            addition_activities: {score: 0},
            activities_absence:  {score: 0}
          }
        },
        public_relationship: {
          score: 15,
          sub_fields: {
            disunity: {score: 0}
          }
        },
        special_achivement: {
          score: 0,
          sub_fields: {
            important_position:    {score: 0},
            high_competion_result: {score: 0},
          }
        }
      }
    end

    def create_evaluation_form(data)
      return self.create(generate_form.merge(data))
    end
  end
end
