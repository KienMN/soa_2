class CreateOrganizations < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations do |t|
      t.string :title, null: false
      t.integer :type_organization
      t.string :description

      # t.integer  :parent_id, null: true, index: true
      # t.integer  :lft, null: false, index: true
      # t.integer  :rgt, null: false, index: true
      # t.integer  :depth, null: false, default: 0
      # t.integer  :children_count, null: false, default: 0

      t.timestamps
    end
  end
end
