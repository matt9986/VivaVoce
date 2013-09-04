class RemoveZipFromUsers < ActiveRecord::Migration
  def up
  	remove_column :users, :zip_code
  end

  def down
  	add_column :users, :zipcode, :integer
  end
end
