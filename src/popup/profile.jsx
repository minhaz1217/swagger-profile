
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeBearerToken, deleteProfileWebConfirmation } from "../services/TokenService.js"
const Profile = (props) => {
    const navigate = useNavigate();

    const onClickApplyButton = () => {
        if (props.profile?.token == null || props.profile?.token == "") {
            return;
        }
        changeBearerToken(props.profile.token);
    }
    const onClickEditButton = () => {
        navigate("/add-new-profile", { 
            state :{
                profile : props.profile
            } 
        });
    }
    const onClickDeleteButton = () => {
        if (props.profile?.token == null || props.profile?.token == "") {
            return;
        }
        deleteProfileWebConfirmation(props.profile.id);
    }

    return (
        <div className="mb-2 row">
            <div className="h2 col-6">{props.profile.name}</div>
            <div className="col-6">
                <button className="btn btn-success me-1 applyButton" data-token={props.profile.token} title="Apply profile" onClick={onClickApplyButton} >
                    <i className="bi bi-check2-circle"></i>
                </button>
                <button className="btn btn-warning me-1 editButton" data-id={props.profile.id} title="Edit" onClick={onClickEditButton}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger deleteButton" data-id={props.profile.id} title="Delete" onClick={onClickDeleteButton}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default Profile; 