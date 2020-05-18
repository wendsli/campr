import React, { useState } from 'react';

import AdminTile from '../components/AdminTile';

const AdminTileContainer = (props) => {
  const [deleteAttempt, setDeleteAttempt] = useState(false)

  return(
    <AdminTile
    campground={props.campground}
    handleDeleteClick={props.handleDeleteClick}
    deleteAttempt={deleteAttempt}
    setDeleteAttempt={setDeleteAttempt}
    setEditCampground={props.setEditCampground}
    />
  )
}

export default AdminTileContainer;
