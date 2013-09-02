class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :pass_hash
      t.string :session_token
      t.int :zip_code

      t.timestamps
    end

    add_index :users, :email, {unique: true}
    add_index :users, :session_token, {unique: true}
  end
end
