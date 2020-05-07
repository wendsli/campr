class ChangeCampgroundColumnNames < ActiveRecord::Migration[5.2]
  def change
    rename_column :campgrounds, :url, :website
    rename_column :campgrounds, :waste_disposal, :waste
  end
end
