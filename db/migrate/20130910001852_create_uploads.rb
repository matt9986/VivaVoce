class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.integer :user_id
      t.integer :business_id
      t.string :title
      t.attatchment :photo

      t.timestamps
    end
  end
end
