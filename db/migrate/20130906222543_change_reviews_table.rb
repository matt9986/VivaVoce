class ChangeReviewsTable < ActiveRecord::Migration
  def up
  	change_column :reviews, :user_id, :integer
  end

  def down
  	change_column :reviews, :user_id, :string
  end
end
