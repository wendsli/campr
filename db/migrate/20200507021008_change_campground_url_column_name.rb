class ChangeCampgroundUrlColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :campgrounds, :url, :website
  end
end
