class CreateCampgrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :campgrounds do |t|
      t.string :name, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.string :url, null: false
      t.string :phone, null: false
      t.boolean :store, null: false, default: false
      t.boolean :firewood, null: false, default: false
      t.boolean :bathrooms, null: false, default: false
      t.boolean :showers, null: false, default: false
      t.boolean :utilities, null: false, default: false
      t.boolean :waste_disposal, null: false, default: false

      t.timestamps
    end

    add_index :campgrounds, :url, unique: true
  end
end
