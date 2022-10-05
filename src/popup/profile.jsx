
import React, { useEffect, useState } from "react";
const Profile = (props) => {




    
    return (
            <div class="mb-2 row">
                <div class="h2 col-6">{props.profile.name}</div>
                <div class="col-6">
                    <button class="btn btn-success me-1 applyButton" data-token={props.profile.token} title="Apply profile"><i class="bi bi-check2-circle"></i></button>
                    <button class="btn btn-warning me-1 editButton" data-id={props.profile.id} title="Edit"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger deleteButton" data-id={props.profile.id} title="Delete"><i class="bi bi-trash"></i></button>
                </div>
            </div>
    );
}

export default Profile;