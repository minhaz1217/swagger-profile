
import React, { useEffect, useState } from "react";
const Profile = (props) => {
    return (
        <div class="mb-2 row">
            <div className="h2 col-6">{props.profile.name}</div>
            <div className="col-6">
                <button className="btn btn-success me-1 applyButton" data-token={props.profile.token} title="Apply profile">
                    <i className="bi bi-check2-circle"></i>
                </button>
                <button className="btn btn-warning me-1 editButton" data-id={props.profile.id} title="Edit">
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger deleteButton" data-id={props.profile.id} title="Delete">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default Profile;