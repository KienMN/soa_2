class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :content, null: false
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
