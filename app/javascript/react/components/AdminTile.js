import React from "react";

const AdminTile = (props) => {
  let deleteCampgroundButton = <input id={`${props.campground.id}`}
    type="submit" value="Delete Campground" onClick={props.deleteClick}
    className="button delete-campground">
    </input>

  return(
    <div className="callout admin-tile">
      Admin Options: {deleteCampgroundButton}
    </div>
  );
};

export default AdminTile;
