class CreateCampgrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :campgrounds do |t|
      t.string :name, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.string :url, null: false
      t.string :phone
      t.string :image
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.boolean :store, default: false
      t.boolean :firewood, default: false
      t.boolean :bathrooms, default: false
      t.boolean :showers, default: false
      t.boolean :utilities, default: false
      t.boolean :waste_disposal, default: false

      t.timestamps
    end

    add_index :campgrounds, :url, unique: true
  end
end
