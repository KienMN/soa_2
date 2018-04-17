class CreateEvalutionForms < ActiveRecord::Migration[5.1]
  def change
    create_table :evalution_forms do |t|
      t.json :target_assignment

      t.integer :self_assessment
      t.integer :class_president_assessment
      t.timestamps
    end
  end
end
