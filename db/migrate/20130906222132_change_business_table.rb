class ChangeBusinessTable < ActiveRecord::Migration
  def up
  	change_column :businesses, :zip, :string
  	change_column :businesses, :lat, :float
  	change_column :businesses, :long, :float
  end

  def down
  	change_column :businesses, :zip, :integer
  	change_column :businesses, :lat, :integer
  	change_column :businesses, :long, :integer
  end
end
