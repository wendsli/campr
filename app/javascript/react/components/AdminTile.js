import React from "react";

const AdminTile = (props) => {

  let editCampgroundButton = <button id={`${props.campground.id}`}
    onClick={() => props.setEditCampground(true)}
    className="admin-edit-campground"
    >
      Edit Campground
    </button>

  let deleteCampgroundButton = <button id={`${props.campground.id}`}
    onClick={() => props.setDeleteAttempt(true)}
    className="admin-delete-campground"
    >
      Delete Campground
    </button>

  let confirmDeleteButton
  if (props.deleteAttempt) {
    confirmDeleteButton = <button id={`${props.campground.id}`}
      onClick={props.handleDeleteClick} className="admin-delete-campground"
      >
        Confirm Deletion
      </button>
  } else {
    confirmDeleteButton = <></>
  }

  return(
    <div className="callout admin-tile">
      Admin Options: {editCampgroundButton}
        {deleteCampgroundButton} {confirmDeleteButton}
    </div>
  );
};

export default AdminTile;
