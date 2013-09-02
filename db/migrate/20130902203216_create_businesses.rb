class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.integer :user_id
      t.string :name
      t.string :street_address
      t.string :city
      t.string :state
      t.integer :zip
      t.integer :lat
      t.integer :long

      t.timestamps
    end
    add_index :businesses, :user_id
    add_index :businesses, [:lat, :long]
    add_index :businesses, :name
  end
end
