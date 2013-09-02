class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :body
      t.integer :business_id
      t.string :user_id

      t.timestamps
    end
    add_index :reviews, :business_id
    add_index :reviews, :user_id
  end
end
