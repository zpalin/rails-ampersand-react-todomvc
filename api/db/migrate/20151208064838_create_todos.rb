class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.boolean :completed
      t.string :title
      t.string :client_id

      t.timestamps
    end
  end
end
