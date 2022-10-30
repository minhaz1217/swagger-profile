declare var bootstrap: any;

import React, { useEffect, useState } from "react";
import { deleteProfile } from "../../services/SwaggerProfileService";
import { changeBearerToken } from "../../services/TokenService";
import IF from "../../shared-components/IF";
import { useHistory } from "react-router-dom";
import { Profile } from "../models/Profile";

export interface ProfileListItemProps {
  profile: Profile,
  onProfileChangeCallback: Function
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({ profile, onProfileChangeCallback }): JSX.Element => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);
  const history = useHistory();


  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  });
  const onClickApplyButton = () => {
    if (profile?.token == null || profile?.token == "") {
      return;
    }
    changeBearerToken(profile.token, profile.name);
  };

  const onClickEditButton = () => {
    history.push("/add-new-profile", {
      profile: profile,
    });
  };
  const onClickDeleteButton = async () => {
    setShowConfirm(true);
  };
  const onConfirmAccept = async () => {
    if (profile?.token == null || profile?.token == "") {
      return;
    }
    const profilesDeleted = await deleteProfile(profile?.id);
    setShowConfirm(false);
    if (profilesDeleted === true) {
      onProfileChangeCallback();
    }
  };
  const onConfirmReject = () => {
    setShowConfirm(false);
  };

  const onClickCopyButton = () => {
    navigator.clipboard.writeText(profile.token);
    setCopiedToClipboard(true);
    setTimeout(() => {
      setCopiedToClipboard(false);
    }, 1000);
  }


  return (
    <div>
      <IF condition={!showConfirm}>
        <div className="mb-2 row">
          <div className="h2 col-6 text-break">{profile.name}</div>
          <div className="col-6">
            <button className="btn btn-success me-1 applyButton" data-token={profile.token} title="Apply profile" onClick={onClickApplyButton} >
              <i className="bi bi-check2-circle"></i>
            </button>
            <button className="btn btn-warning me-1 editButton" data-id={profile.id} title="Edit" onClick={onClickEditButton}>
              <i className="bi bi-pencil-square"></i>
            </button>

            <button className={"btn " + (copiedToClipboard ? "btn-success" : "btn-primary")} title="Copy to clipboard" onClick={onClickCopyButton} data-bs-placement="top" data-bs-title="Tooltip on top">
              <IF condition={!copiedToClipboard}>
                <i className="bi bi-clipboard"></i>
              </IF>
              <IF condition={copiedToClipboard}>
                <i className="bi bi-clipboard-check"></i>
              </IF>
            </button>

            {/* <button className="btn btn-danger deleteButton" data-id={profile.id} title="Delete" onClick={onClickDeleteButton}>
              <i className="bi bi-trash"></i>
            </button> */}
          </div>
        </div>

      </IF>
      <IF condition={showConfirm}>
        <div className="mb-2 row">
          <div className="h2 col-6">Confirm?</div>
          <div className="col-6">
            <button className="btn btn-success me-1" data-token={profile.token} title="Yes" onClick={onConfirmAccept} >
              <i className="bi bi-check-lg"></i>
            </button>
            <button className="btn btn-danger" title="No" onClick={onConfirmReject}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </IF>
    </div>
  );
};

export default ProfileListItem;
