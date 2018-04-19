class CreateEvaluationForms < ActiveRecord::Migration[5.1]
  def change
    create_table :evaluation_forms do |t|
      t.json :target_assignment
      t.integer :status, default: 0

      t.integer :confirmation, default: 1
      t.integer :self_assessment, default: 0
      t.integer :class_president_assessment, default: 0
      t.integer :classification, default: 0
      t.references :semester, foreign_key: true, index: true
      t.references :student, foreign_key: {to_table: :users}, index: true
      t.references :class_president, foreign_key: {to_table: :users}, index: true
      t.timestamps
    end
  end
end
