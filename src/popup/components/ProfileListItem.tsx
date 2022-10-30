import React, {useState} from "react";
import {changeBearerToken} from "../../services/TokenService";
import IF from "../../shared-components/IF";
import {useHistory} from "react-router-dom";
import {Profile} from "../models/Profile";

export interface ProfileListItemProps {
  profile: Profile
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({profile}): JSX.Element => {
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);
  const history = useHistory();

  const onClickApplyButton = async () => {
    if (profile?.token == null || profile?.token == "") {
      return;
    }
    await changeBearerToken(profile.token, profile.name);
  };

  const onClickEditButton = () => {
    history.push("/add-new-profile", {
      profile: profile,
    });
  };

  const onClickCopyButton = () => {
    navigator.clipboard.writeText(profile.token);
    setCopiedToClipboard(true);
    setTimeout(() => {
      setCopiedToClipboard(false);
    }, 1000);
  };


  return (
    <div>
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
              <i className="bi bi-clipboard-plus"></i>
            </IF>
            <IF condition={copiedToClipboard}>
              <i className="bi bi-clipboard-check"></i>
            </IF>
          </button>

        </div>
      </div>

    </div>
  );
};

export default ProfileListItem;
