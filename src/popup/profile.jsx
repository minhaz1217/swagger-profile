
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../services/SwaggerProfileService.js";
import { changeBearerToken, deleteProfileWebConfirmation } from "../services/TokenService.js"
const Profile = ({ profile, onProfileChangeCallback }) => {
    const navigate = useNavigate();

    const onClickApplyButton = () => {
        if (profile?.token == null || profile?.token == "") {
            return;
        }
        changeBearerToken(profile.token);
    }
    const onClickEditButton = () => {
        navigate("/add-new-profile", {
            state: {
                profile: profile
            }
        });
    }
    const onClickDeleteButton = async () => {
        if (profile?.token == null || profile?.token == "") {
            return;
        }
        let profilesDeleted = await deleteProfile(profile?.id);
        if (profilesDeleted === true) {
            onProfileChangeCallback();
        }
    }

    return (
        <div className="mb-2 row">
            <div className="h2 col-6">{profile.name}</div>
            <div className="col-6">
                <button className="btn btn-success me-1 applyButton" data-token={profile.token} title="Apply profile" onClick={onClickApplyButton} >
                    <i className="bi bi-check2-circle"></i>
                </button>
                <button className="btn btn-warning me-1 editButton" data-id={profile.id} title="Edit" onClick={onClickEditButton}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger deleteButton" data-id={profile.id} title="Delete" onClick={onClickDeleteButton}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default Profile; 